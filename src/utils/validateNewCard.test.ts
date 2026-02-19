import { describe, it, expect } from 'vitest';
import { validateNewCard } from './validateNewCard';

describe('validateNewCard', () => {
  describe('empty French fails', () => {
    it('rejects empty French field', () => {
      const result = validateNewCard({
        french: '',
        german: 'die Katze',
        category: 'animals',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.french).toBeDefined();
    });

    it('rejects whitespace-only French field', () => {
      const result = validateNewCard({
        french: '   ',
        german: 'die Katze',
        category: 'animals',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.french).toBeDefined();
    });
  });

  describe('empty German fails', () => {
    it('rejects empty German field', () => {
      const result = validateNewCard({
        french: 'le chat',
        german: '',
        category: 'animals',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.german).toBeDefined();
    });

    it('rejects whitespace-only German field', () => {
      const result = validateNewCard({
        french: 'le chat',
        german: '   ',
        category: 'animals',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.german).toBeDefined();
    });
  });

  describe('category required', () => {
    it('rejects empty category field', () => {
      const result = validateNewCard({
        french: 'le chat',
        german: 'die Katze',
        category: '',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.category).toBeDefined();
    });

    it('rejects whitespace-only category field', () => {
      const result = validateNewCard({
        french: 'le chat',
        german: 'die Katze',
        category: '   ',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.category).toBeDefined();
    });
  });

  describe('valid passes', () => {
    it('accepts valid card with all fields', () => {
      const result = validateNewCard({
        french: 'le chat',
        german: 'die Katze',
        category: 'animals',
      });
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('accepts valid card with trimmed whitespace', () => {
      const result = validateNewCard({
        french: '  le chat  ',
        german: '  die Katze  ',
        category: '  animals  ',
      });
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual({});
    });
  });

  describe('multiple errors', () => {
    it('returns all errors when multiple fields are invalid', () => {
      const result = validateNewCard({
        french: '',
        german: '',
        category: '',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.french).toBeDefined();
      expect(result.errors.german).toBeDefined();
      expect(result.errors.category).toBeDefined();
    });

    it('returns multiple errors for partially invalid card', () => {
      const result = validateNewCard({
        french: 'le chat',
        german: '',
        category: '',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.french).toBeUndefined();
      expect(result.errors.german).toBeDefined();
      expect(result.errors.category).toBeDefined();
    });
  });

  describe('error messages', () => {
    it('provides descriptive error message for French', () => {
      const result = validateNewCard({
        french: '',
        german: 'die Katze',
        category: 'animals',
      });
      expect(result.errors.french).toBe('French word is required');
    });

    it('provides descriptive error message for German', () => {
      const result = validateNewCard({
        french: 'le chat',
        german: '',
        category: 'animals',
      });
      expect(result.errors.german).toBe('German word is required');
    });

    it('provides descriptive error message for category', () => {
      const result = validateNewCard({
        french: 'le chat',
        german: 'die Katze',
        category: '',
      });
      expect(result.errors.category).toBe('Category is required');
    });
  });
});
