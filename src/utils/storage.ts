import type { Flashcard } from '../types/flashcard';

const STORAGE_KEY = 'flashcards';

function isValidCard(card: unknown): card is Flashcard {
  if (typeof card !== 'object' || card === null) return false;
  
  const obj = card as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    typeof obj.french === 'string' &&
    typeof obj.german === 'string' &&
    typeof obj.category === 'string'
  );
}

export function saveCards(cards: Flashcard[]): void {
  try {
    const json = JSON.stringify(cards);
    localStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    // Silently fail - don't crash the app
    console.error('Failed to save cards to localStorage:', error);
  }
}

export function loadCards(): Flashcard[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);
    
    if (!Array.isArray(parsed)) {
      return [];
    }

    // Filter out invalid cards
    return parsed.filter(isValidCard);
  } catch (error) {
    // JSON parse error or other error - return empty array
    console.error('Failed to load cards from localStorage:', error);
    return [];
  }
}
