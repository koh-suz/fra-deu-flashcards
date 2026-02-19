import { describe, it, expect } from 'vitest';
import { generateMultipleChoiceOptions } from './generateOptions';
import type { Flashcard } from '../types/flashcard';

const mockCards: Flashcard[] = [
  { id: '1', french: 'le chat', german: 'die Katze', category: 'animals' },
  { id: '2', french: 'le chien', german: 'der Hund', category: 'animals' },
  { id: '3', french: 'la pomme', german: 'der Apfel', category: 'food' },
  { id: '4', french: 'le pain', german: 'das Brot', category: 'food' },
  { id: '5', french: 'manger', german: 'essen', category: 'verbs' },
];

describe('generateMultipleChoiceOptions', () => {
  it('returns exactly 3 options', () => {
    const correct = mockCards[0];
    const options = generateMultipleChoiceOptions(correct, mockCards);
    expect(options).toHaveLength(3);
  });

  it('includes exactly 1 correct answer', () => {
    const correct = mockCards[0];
    const options = generateMultipleChoiceOptions(correct, mockCards);
    const correctCount = options.filter((opt) => opt === correct.german).length;
    expect(correctCount).toBe(1);
  });

  it('has no duplicate options', () => {
    const correct = mockCards[0];
    const options = generateMultipleChoiceOptions(correct, mockCards);
    const uniqueOptions = new Set(options);
    expect(uniqueOptions.size).toBe(3);
  });

  it('returns different order on repeated calls (randomized)', () => {
    const correct = mockCards[0];
    const orders: string[] = [];
    
    // Generate 20 times to check for randomization
    for (let i = 0; i < 20; i++) {
      const options = generateMultipleChoiceOptions(correct, mockCards);
      orders.push(options.join(','));
    }
    
    const uniqueOrders = new Set(orders);
    // Should have at least 2 different orders out of 20 attempts
    expect(uniqueOrders.size).toBeGreaterThan(1);
  });

  it('works with minimum card set', () => {
    const minCards = mockCards.slice(0, 3);
    const correct = minCards[0];
    const options = generateMultipleChoiceOptions(correct, minCards);
    
    expect(options).toHaveLength(3);
    expect(options).toContain(correct.german);
  });

  it('uses distractor pool when not enough cards', () => {
    const singleCard = [mockCards[0]];
    const correct = singleCard[0];
    const options = generateMultipleChoiceOptions(correct, singleCard);
    
    expect(options).toHaveLength(3);
    expect(options).toContain(correct.german);
    // Other 2 should come from distractor pool
    expect(options.filter((opt) => opt !== correct.german)).toHaveLength(2);
  });

  it('does not include the correct answer as a distractor', () => {
    const correct = mockCards[0];
    const options = generateMultipleChoiceOptions(correct, mockCards);
    
    // Count how many times the correct answer appears
    const correctCount = options.filter((opt) => opt === correct.german).length;
    expect(correctCount).toBe(1);
  });

  it('generates valid options for all cards', () => {
    // Test that all cards can generate valid options
    mockCards.forEach((card) => {
      const options = generateMultipleChoiceOptions(card, mockCards);
      expect(options).toHaveLength(3);
      expect(options).toContain(card.german);
      expect(new Set(options).size).toBe(3);
    });
  });

  it('checks for no bias in position of correct answer over many runs', () => {
    const correct = mockCards[0];
    const positions = { 0: 0, 1: 0, 2: 0 };
    
    // Run 300 times to check distribution
    for (let i = 0; i < 300; i++) {
      const options = generateMultipleChoiceOptions(correct, mockCards);
      const correctIndex = options.indexOf(correct.german);
      positions[correctIndex as 0 | 1 | 2]++;
    }
    
    // Each position should appear at least 50 times out of 300 (rough check for randomness)
    // Perfect distribution would be 100 each, but allow for variance
    expect(positions[0]).toBeGreaterThan(50);
    expect(positions[1]).toBeGreaterThan(50);
    expect(positions[2]).toBeGreaterThan(50);
  });
});
