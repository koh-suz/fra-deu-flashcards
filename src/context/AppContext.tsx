import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Flashcard } from '../types/flashcard';
import { initialCards } from '../data/initialCards';
import { saveCards, loadCards } from '../utils/storage';

interface AppContextType {
  cards: Flashcard[];
  addCard: (card: Flashcard) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Flashcard[]>(() => {
    const stored = loadCards();
    return stored.length > 0 ? stored : initialCards;
  });

  useEffect(() => {
    saveCards(cards);
  }, [cards]);

  const addCard = (card: Flashcard) => {
    setCards((prev) => [...prev, card]);
  };

  return (
    <AppContext.Provider value={{ cards, addCard }}>
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
