import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Flashcard } from '../types/flashcard';
import { initialCards } from '../data/initialCards';
import { saveCards, loadCards } from '../utils/storage';
import { fetchCards, createCard } from '../utils/supabaseMCP';

interface AppContextType {
  cards: Flashcard[];
  addCard: (card: Flashcard) => void;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize: Load from Supabase, fallback to localStorage, migrate if needed
  const initializeCards = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Try to fetch from Supabase
      const supabaseCards = await fetchCards();

      if (supabaseCards.length > 0) {
        // Use Supabase data if available
        setCards(supabaseCards);
        // Sync to localStorage as backup
        saveCards(supabaseCards);
      } else {
        // No Supabase data - check localStorage for migration
        const localCards = loadCards();
        
        if (localCards.length > 0) {
          // Migrate localStorage cards to Supabase
          console.log('Migrating', localCards.length, 'cards from localStorage to Supabase...');
          const migratedCards: Flashcard[] = [];
          
          for (const card of localCards) {
            try {
              const created = await createCard({
                french: card.french,
                german: card.german,
                category: card.category,
              });
              migratedCards.push(created);
            } catch (err) {
              console.error('Failed to migrate card:', card, err);
            }
          }
          
          setCards(migratedCards);
          console.log('Migration complete:', migratedCards.length, 'cards migrated');
        } else {
          // No data anywhere - use initial cards
          setCards(initialCards);
          saveCards(initialCards);
        }
      }
    } catch (err) {
      console.error('Failed to load from Supabase, using localStorage fallback:', err);
      setError('Failed to connect to database. Using offline mode.');
      
      // Fallback to localStorage
      const localCards = loadCards();
      setCards(localCards.length > 0 ? localCards : initialCards);
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    initializeCards();
  }, []);

  // Save to localStorage whenever cards change (offline backup)
  useEffect(() => {
    if (isInitialized) {
      saveCards(cards);
    }
  }, [cards, isInitialized]);

  const addCard = async (card: Flashcard) => {
    try {
      // Optimistically update UI
      setCards((prev) => [...prev, card]);

      // Try to save to Supabase
      await createCard({
        french: card.french,
        german: card.german,
        category: card.category,
      });
    } catch (err) {
      console.error('Failed to save card to Supabase:', err);
      setError('Failed to save card to database. Saved locally.');
      // Card is already in state, will be saved to localStorage via useEffect
    }
  };

  const retry = () => {
    initializeCards();
  };

  return (
    <AppContext.Provider value={{ cards, addCard, isLoading, error, retry }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
