import { describe, it, expect } from 'vitest';
import {
  createSession,
  markCorrect,
  markWrong,
  isSessionComplete,
} from './studyEngine';
import type { SessionState } from '../../types/flashcard';

const CARD_IDS = ['1', '2', '3'];

describe('createSession', () => {
  it('sets currentCardId to first card', () => {
    const state = createSession(CARD_IDS, 'study');
    expect(CARD_IDS).toContain(state.currentCardId);
  });

  it('places remaining cards in remainingCards', () => {
    const state = createSession(CARD_IDS, 'study');
    expect(state.remainingCards).toHaveLength(CARD_IDS.length - 1);
    expect(state.remainingCards).not.toContain(state.currentCardId);
  });

  it('initializes wrongCards as empty', () => {
    const state = createSession(CARD_IDS, 'study');
    expect(state.wrongCards).toEqual([]);
  });

  it('initializes correctCount and incorrectCount to zero', () => {
    const state = createSession(CARD_IDS, 'study');
    expect(state.correctCount).toBe(0);
    expect(state.incorrectCount).toBe(0);
  });

  it('sets the mode', () => {
    const state = createSession(CARD_IDS, 'quiz-mc');
    expect(state.mode).toBe('quiz-mc');
  });

  it('handles empty card list', () => {
    const state = createSession([], 'study');
    expect(state.currentCardId).toBeNull();
    expect(state.remainingCards).toEqual([]);
  });

  it('contains all provided card IDs across currentCardId and remainingCards', () => {
    const state = createSession(CARD_IDS, 'study');
    const all = state.currentCardId
      ? [state.currentCardId, ...state.remainingCards]
      : state.remainingCards;
    expect(all.sort()).toEqual([...CARD_IDS].sort());
  });
});

describe('markCorrect', () => {
  it('removes the current card from the queue', () => {
    const state = createSession(CARD_IDS, 'study');
    const next = markCorrect(state);
    expect(next.currentCardId).not.toBe(state.currentCardId);
    expect(next.remainingCards).not.toContain(state.currentCardId);
  });

  it('increments correctCount', () => {
    const state = createSession(CARD_IDS, 'study');
    const next = markCorrect(state);
    expect(next.correctCount).toBe(state.correctCount + 1);
  });

  it('advances to the next card', () => {
    const state = createSession(CARD_IDS, 'study');
    const next = markCorrect(state);
    expect(next.currentCardId).toBe(state.remainingCards[0]);
  });

  it('sets currentCardId to null when last card is marked correct', () => {
    const single = createSession(['1'], 'study');
    const next = markCorrect(single);
    expect(next.currentCardId).toBeNull();
    expect(next.remainingCards).toEqual([]);
  });

  it('does not mutate the original state', () => {
    const state = createSession(CARD_IDS, 'study');
    const originalRemaining = [...state.remainingCards];
    markCorrect(state);
    expect(state.remainingCards).toEqual(originalRemaining);
  });
});

describe('markWrong', () => {
  it('moves the current card to the end of the queue', () => {
    const state = createSession(CARD_IDS, 'study');
    const next = markWrong(state);
    const last = next.remainingCards[next.remainingCards.length - 1];
    expect(last).toBe(state.currentCardId);
  });

  it('advances to the next card', () => {
    const state = createSession(CARD_IDS, 'study');
    const next = markWrong(state);
    expect(next.currentCardId).toBe(state.remainingCards[0]);
  });

  it('increments incorrectCount', () => {
    const state = createSession(CARD_IDS, 'study');
    const next = markWrong(state);
    expect(next.incorrectCount).toBe(state.incorrectCount + 1);
  });

  it('adds card to wrongCards', () => {
    const state = createSession(CARD_IDS, 'study');
    const next = markWrong(state);
    expect(next.wrongCards).toContain(state.currentCardId);
  });

  it('does not duplicate entries in wrongCards', () => {
    const state = createSession(['1', '2'], 'study');
    const after1 = markWrong(state);
    const after2 = markWrong(after1);
    const after3 = markWrong(after2);
    const count = after3.wrongCards.filter((id) => id === state.currentCardId).length;
    expect(count).toBe(1);
  });

  it('does not mutate the original state', () => {
    const state = createSession(CARD_IDS, 'study');
    const originalRemaining = [...state.remainingCards];
    const originalWrong = [...state.wrongCards];
    markWrong(state);
    expect(state.remainingCards).toEqual(originalRemaining);
    expect(state.wrongCards).toEqual(originalWrong);
  });
});

describe('isSessionComplete', () => {
  it('returns false when there are cards remaining', () => {
    const state = createSession(CARD_IDS, 'study');
    expect(isSessionComplete(state)).toBe(false);
  });

  it('returns true when currentCardId is null', () => {
    const state: SessionState = {
      currentCardId: null,
      remainingCards: [],
      wrongCards: [],
      correctCount: 3,
      incorrectCount: 0,
      mode: 'study',
    };
    expect(isSessionComplete(state)).toBe(true);
  });

  it('returns true after all cards are marked correct', () => {
    let state = createSession(['1'], 'study');
    state = markCorrect(state);
    expect(isSessionComplete(state)).toBe(true);
  });
});

describe('session end-to-end', () => {
  it('session ends when all cards have been marked correct at least once', () => {
    let state = createSession(['a', 'b', 'c'], 'study');
    state = markWrong(state);
    state = markCorrect(state);
    state = markCorrect(state);
    state = markCorrect(state);
    expect(isSessionComplete(state)).toBe(true);
  });
});
