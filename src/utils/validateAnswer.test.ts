import { describe, it, expect } from 'vitest';
import { validateAnswer } from './validateAnswer';

describe('validateAnswer', () => {
  const correctAnswer = 'die Katze';

  describe('case insensitive matching', () => {
    it('accepts correct answer in lowercase', () => {
      expect(validateAnswer('die katze', correctAnswer)).toBe(true);
    });

    it('accepts correct answer in uppercase', () => {
      expect(validateAnswer('DIE KATZE', correctAnswer)).toBe(true);
    });

    it('accepts correct answer in mixed case', () => {
      expect(validateAnswer('DiE kAtZe', correctAnswer)).toBe(true);
    });

    it('accepts correct answer with exact case', () => {
      expect(validateAnswer('die Katze', correctAnswer)).toBe(true);
    });
  });

  describe('whitespace trimming', () => {
    it('trims leading whitespace', () => {
      expect(validateAnswer('  die Katze', correctAnswer)).toBe(true);
    });

    it('trims trailing whitespace', () => {
      expect(validateAnswer('die Katze  ', correctAnswer)).toBe(true);
    });

    it('trims both leading and trailing whitespace', () => {
      expect(validateAnswer('  die Katze  ', correctAnswer)).toBe(true);
    });

    it('normalizes internal whitespace', () => {
      expect(validateAnswer('die  Katze', correctAnswer)).toBe(true);
    });
  });

  describe('strict matching', () => {
    it('rejects incorrect answer', () => {
      expect(validateAnswer('der Hund', correctAnswer)).toBe(false);
    });

    it('rejects partial answer', () => {
      expect(validateAnswer('Katze', correctAnswer)).toBe(false);
    });

    it('rejects answer with extra words', () => {
      expect(validateAnswer('die Katze ist klein', correctAnswer)).toBe(false);
    });

    it('rejects answer with missing words', () => {
      expect(validateAnswer('die', correctAnswer)).toBe(false);
    });

    it('rejects similar but incorrect answer', () => {
      expect(validateAnswer('das Katze', correctAnswer)).toBe(false);
    });
  });

  describe('empty input handling', () => {
    it('rejects empty string', () => {
      expect(validateAnswer('', correctAnswer)).toBe(false);
    });

    it('rejects whitespace-only string', () => {
      expect(validateAnswer('   ', correctAnswer)).toBe(false);
    });

    it('rejects null or undefined-like values', () => {
      expect(validateAnswer('', correctAnswer)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('handles special characters correctly', () => {
      expect(validateAnswer('l\'oiseau', 'l\'oiseau')).toBe(true);
      expect(validateAnswer('L\'OISEAU', 'l\'oiseau')).toBe(true);
    });

    it('handles umlauts correctly', () => {
      expect(validateAnswer('der käse', 'der Käse')).toBe(true);
      expect(validateAnswer('DER KÄSE', 'der Käse')).toBe(true);
    });

    it('handles accented characters correctly', () => {
      expect(validateAnswer('café', 'café')).toBe(true);
      expect(validateAnswer('CAFÉ', 'café')).toBe(true);
    });

    it('does not mutate input strings', () => {
      const userInput = '  Die Katze  ';
      const original = userInput;
      validateAnswer(userInput, correctAnswer);
      expect(userInput).toBe(original);
    });

    it('does not mutate correct answer', () => {
      const answer = 'die Katze';
      const original = answer;
      validateAnswer('DIE KATZE', answer);
      expect(answer).toBe(original);
    });
  });

  describe('comprehensive validation', () => {
    const testCases = [
      { input: 'die Katze', expected: true, description: 'exact match' },
      { input: 'DIE KATZE', expected: true, description: 'uppercase' },
      { input: 'die katze', expected: true, description: 'lowercase' },
      { input: '  die Katze  ', expected: true, description: 'with whitespace' },
      { input: 'die  Katze', expected: true, description: 'extra internal space' },
      { input: '', expected: false, description: 'empty string' },
      { input: '   ', expected: false, description: 'only spaces' },
      { input: 'Katze', expected: false, description: 'partial match' },
      { input: 'der Katze', expected: false, description: 'wrong article' },
      { input: 'die Katze!', expected: false, description: 'extra punctuation' },
    ];

    testCases.forEach(({ input, expected, description }) => {
      it(`${description}: "${input}" should be ${expected}`, () => {
        expect(validateAnswer(input, correctAnswer)).toBe(expected);
      });
    });
  });
});
