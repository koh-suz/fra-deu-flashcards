import { useState, useEffect, useCallback } from 'react';
import type { Flashcard } from '../types/flashcard';
import { initialCards } from '../data/initialCards';
import { saveCards, loadCards } from '../utils/storage';
import { fetchCards, createCard, updateCard, deleteCard } from '../utils/supabaseMCP';
import { supabase } from '../lib/supabase';

const MIGRATION_FLAG_KEY = 'flashcards_migrated';

export function useFlashcards() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeCards = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const supabaseCards = await fetchCards();

      if (supabaseCards.length > 0) {
        setCards(supabaseCards);
        saveCards(supabaseCards);
      } else {
        const alreadyMigrated = localStorage.getItem(MIGRATION_FLAG_KEY) === 'true';
        const localCards = loadCards();

        if (!alreadyMigrated && localCards.length > 0) {
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
          localStorage.setItem(MIGRATION_FLAG_KEY, 'true');
          console.log('Migration complete:', migratedCards.length, 'cards migrated');
        } else {
          setCards(localCards.length > 0 ? localCards : initialCards);
          if (localCards.length === 0) saveCards(initialCards);
        }
      }
    } catch (err) {
      console.error('Failed to load from Supabase, using localStorage fallback:', err);
      setError('Failed to connect to database. Using offline mode.');
      const localCards = loadCards();
      setCards(localCards.length > 0 ? localCards : initialCards);
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    initializeCards();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        setCards([]);
        setIsInitialized(false);
        initializeCards();
      }
    });

    return () => subscription.unsubscribe();
  }, [initializeCards]);

  useEffect(() => {
    if (isInitialized) {
      saveCards(cards);
    }
  }, [cards, isInitialized]);

  const addCard = async (card: Omit<Flashcard, 'id'>): Promise<void> => {
    try {
      const saved = await createCard(card);
      setCards((prev) => [...prev, saved]);
    } catch (err) {
      console.error('Failed to save card to Supabase:', err);
      setError('Failed to save card to database. Saved locally.');
      const localCard: Flashcard = { id: crypto.randomUUID(), ...card };
      setCards((prev) => [...prev, localCard]);
    }
  };

  const editCard = async (id: string, updates: { french?: string; german?: string; category?: string }): Promise<void> => {
    try {
      const saved = await updateCard(id, updates);
      setCards((prev) => prev.map((c) => (c.id === id ? saved : c)));
    } catch (err) {
      console.error('Failed to update card:', err);
      setError('Failed to update card.');
    }
  };

  const removeCard = async (id: string): Promise<void> => {
    try {
      await deleteCard(id);
      setCards((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Failed to delete card:', err);
      setError('Failed to delete card.');
    }
  };

  const retry = () => {
    initializeCards();
  };

  return { cards, isLoading, error, addCard, editCard, removeCard, retry };
}
