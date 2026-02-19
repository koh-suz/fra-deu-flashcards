import type { Flashcard } from '../types/flashcard';

export function filterCardsByCategory(
  cards: Flashcard[],
  category: string,
): Flashcard[] {
  if (category === 'all') return cards;
  return cards.filter((c) => c.category === category);
}
