import type { SessionState } from '../../types/flashcard';
import { shuffle } from '../../utils/shuffle';

export function createSession(
  cardIds: string[],
  mode: SessionState['mode'],
): SessionState {
  const shuffled = shuffle(cardIds);
  return {
    currentCardId: shuffled[0] ?? null,
    remainingCards: shuffled.slice(1),
    wrongCards: [],
    correctCount: 0,
    incorrectCount: 0,
    mode,
  };
}

export function markCorrect(state: SessionState): SessionState {
  return {
    ...state,
    currentCardId: state.remainingCards[0] ?? null,
    remainingCards: state.remainingCards.slice(1),
    correctCount: state.correctCount + 1,
  };
}

export function markWrong(state: SessionState): SessionState {
  const currentId = state.currentCardId!;
  const queue = [...state.remainingCards, currentId];
  const newWrongCards = state.wrongCards.includes(currentId)
    ? state.wrongCards
    : [...state.wrongCards, currentId];
  return {
    ...state,
    currentCardId: queue[0],
    remainingCards: queue.slice(1),
    wrongCards: newWrongCards,
    incorrectCount: state.incorrectCount + 1,
  };
}

export function isSessionComplete(state: SessionState): boolean {
  return state.currentCardId === null;
}
