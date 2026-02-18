import { describe, it, expect } from 'vitest';
import { updateStats, calculateAccuracy } from './statsEngine';
import type { Stats } from './statsEngine';

const EMPTY: Stats = { correctCount: 0, incorrectCount: 0 };

describe('updateStats', () => {
  it('increments correctCount on correct result', () => {
    const next = updateStats(EMPTY, 'correct');
    expect(next.correctCount).toBe(1);
    expect(next.incorrectCount).toBe(0);
  });

  it('increments incorrectCount on wrong result', () => {
    const next = updateStats(EMPTY, 'wrong');
    expect(next.incorrectCount).toBe(1);
    expect(next.correctCount).toBe(0);
  });

  it('accumulates multiple updates correctly', () => {
    let stats = EMPTY;
    stats = updateStats(stats, 'correct');
    stats = updateStats(stats, 'correct');
    stats = updateStats(stats, 'wrong');
    expect(stats.correctCount).toBe(2);
    expect(stats.incorrectCount).toBe(1);
  });

  it('does not mutate the original stats object', () => {
    const stats: Stats = { correctCount: 3, incorrectCount: 1 };
    updateStats(stats, 'correct');
    updateStats(stats, 'wrong');
    expect(stats.correctCount).toBe(3);
    expect(stats.incorrectCount).toBe(1);
  });
});

describe('calculateAccuracy', () => {
  it('returns 0 when no cards studied (zero division safe)', () => {
    expect(calculateAccuracy(EMPTY)).toBe(0);
  });

  it('returns 100 when all answers are correct', () => {
    expect(calculateAccuracy({ correctCount: 5, incorrectCount: 0 })).toBe(100);
  });

  it('returns 0 when all answers are wrong', () => {
    expect(calculateAccuracy({ correctCount: 0, incorrectCount: 4 })).toBe(0);
  });

  it('calculates accuracy as a percentage', () => {
    expect(calculateAccuracy({ correctCount: 3, incorrectCount: 1 })).toBe(75);
  });

  it('rounds to nearest integer', () => {
    expect(calculateAccuracy({ correctCount: 1, incorrectCount: 2 })).toBe(33);
  });
});
