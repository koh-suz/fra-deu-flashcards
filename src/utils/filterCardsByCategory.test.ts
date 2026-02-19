import { describe, it, expect } from 'vitest';
import { filterCardsByCategory } from './filterCardsByCategory';
import type { Flashcard } from '../types/flashcard';

const mockCards: Flashcard[] = [
  { id: '1', french: 'le chat', german: 'die Katze', category: 'animals' },
  { id: '2', french: 'le chien', german: 'der Hund', category: 'animals' },
  { id: '3', french: 'la pomme', german: 'der Apfel', category: 'food' },
  { id: '4', french: 'le pain', german: 'das Brot', category: 'food' },
  { id: '5', french: 'manger', german: 'essen', category: 'verbs' },
];

describe('filterCardsByCategory', () => {
  it('returns correct subset for specific category', () => {
    const result = filterCardsByCategory(mockCards, 'animals');
    expect(result).toHaveLength(2);
    expect(result.every((c) => c.category === 'animals')).toBe(true);
    expect(result.map((c) => c.id)).toEqual(['1', '2']);
  });

  it('returns all cards for "all" category', () => {
    const result = filterCardsByCategory(mockCards, 'all');
    expect(result).toHaveLength(5);
    expect(result).toEqual(mockCards);
  });

  it('returns empty array for unknown category', () => {
    const result = filterCardsByCategory(mockCards, 'nonexistent');
    expect(result).toEqual([]);
  });

  it('returns empty array for empty input cards', () => {
    const result = filterCardsByCategory([], 'animals');
    expect(result).toEqual([]);
  });

  it('handles case-sensitive category matching', () => {
    const result = filterCardsByCategory(mockCards, 'Animals');
    expect(result).toEqual([]);
  });

  it('does not mutate the original cards array', () => {
    const original = [...mockCards];
    filterCardsByCategory(mockCards, 'food');
    expect(mockCards).toEqual(original);
  });
});
