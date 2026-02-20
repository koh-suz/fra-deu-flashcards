import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Flashcard } from '../types/flashcard';
import { useFlashcards } from '../hooks/useFlashcards';

interface AppContextType {
  cards: Flashcard[];
  addCard: (card: Omit<Flashcard, 'id'>) => Promise<void>;
  editCard: (id: string, updates: { french?: string; german?: string; category?: string }) => Promise<void>;
  removeCard: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const flashcards = useFlashcards();

  return (
    <AppContext.Provider value={flashcards}>
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
