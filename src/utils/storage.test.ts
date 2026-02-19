import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveCards, loadCards } from './storage';
import type { Flashcard } from '../types/flashcard';

const mockCards: Flashcard[] = [
  { id: '1', french: 'le chat', german: 'die Katze', category: 'animals' },
  { id: '2', french: 'le chien', german: 'der Hund', category: 'animals' },
];

describe('localStorage wrapper', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('saveCards', () => {
    it('saves cards to localStorage', () => {
      saveCards(mockCards);
      const stored = localStorage.getItem('flashcards');
      expect(stored).toBeDefined();
      expect(JSON.parse(stored!)).toEqual(mockCards);
    });

    it('overwrites existing cards', () => {
      saveCards(mockCards);
      const newCards = [mockCards[0]];
      saveCards(newCards);
      const stored = localStorage.getItem('flashcards');
      expect(JSON.parse(stored!)).toEqual(newCards);
    });

    it('handles empty array', () => {
      saveCards([]);
      const stored = localStorage.getItem('flashcards');
      expect(JSON.parse(stored!)).toEqual([]);
    });
  });

  describe('loadCards', () => {
    it('loads cards from localStorage', () => {
      localStorage.setItem('flashcards', JSON.stringify(mockCards));
      const loaded = loadCards();
      expect(loaded).toEqual(mockCards);
    });

    it('returns empty array when storage is empty', () => {
      const loaded = loadCards();
      expect(loaded).toEqual([]);
    });

    it('returns empty array when storage contains null', () => {
      localStorage.setItem('flashcards', 'null');
      const loaded = loadCards();
      expect(loaded).toEqual([]);
    });

    it('handles corrupted JSON gracefully', () => {
      localStorage.setItem('flashcards', 'invalid json {');
      const loaded = loadCards();
      expect(loaded).toEqual([]);
    });

    it('handles non-array JSON gracefully', () => {
      localStorage.setItem('flashcards', '{"not": "array"}');
      const loaded = loadCards();
      expect(loaded).toEqual([]);
    });

    it('validates card structure', () => {
      const invalidCards = [
        { id: '1', french: 'le chat' }, // missing fields
      ];
      localStorage.setItem('flashcards', JSON.stringify(invalidCards));
      const loaded = loadCards();
      // Should filter out invalid cards
      expect(loaded).toEqual([]);
    });

    it('filters out invalid cards but keeps valid ones', () => {
      const mixedCards = [
        { id: '1', french: 'le chat', german: 'die Katze', category: 'animals' },
        { id: '2', french: 'incomplete' }, // invalid
      ];
      localStorage.setItem('flashcards', JSON.stringify(mixedCards));
      const loaded = loadCards();
      expect(loaded).toEqual([mixedCards[0]]);
    });
  });

  describe('error handling', () => {
    it('saveCards does not crash on localStorage error', () => {
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
      setItemSpy.mockImplementation(() => {
        throw new Error('Quota exceeded');
      });

      expect(() => saveCards(mockCards)).not.toThrow();
      setItemSpy.mockRestore();
    });

    it('loadCards does not crash on localStorage error', () => {
      const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
      getItemSpy.mockImplementation(() => {
        throw new Error('Access denied');
      });

      expect(() => loadCards()).not.toThrow();
      const result = loadCards();
      expect(result).toEqual([]);
      getItemSpy.mockRestore();
    });
  });
});
