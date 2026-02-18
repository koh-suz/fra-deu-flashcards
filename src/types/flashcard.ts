export interface Flashcard {
  id: string;
  french: string;
  german: string;
  category: string;
}

export interface SessionState {
  currentCardId: string | null;
  remainingCards: string[];
  wrongCards: string[];
  correctCount: number;
  incorrectCount: number;
  mode: 'study' | 'quiz-mc' | 'quiz-fill';
}
