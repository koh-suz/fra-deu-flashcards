import type { Flashcard } from '../types/flashcard';
import { shuffle } from './shuffle';

const DISTRACTOR_POOL = [
  'der Apfel', 'das Buch', 'die Stadt', 'der Mann', 'die Frau',
  'das Kind', 'der Tisch', 'die Tür', 'das Fenster', 'der Stuhl',
  'die Lampe', 'das Auto', 'der Baum', 'die Blume', 'das Haus',
];

export function generateMultipleChoiceOptions(
  correct: Flashcard,
  allCards: Flashcard[],
): string[] {
  const otherGerman = allCards
    .filter((c) => c.id !== correct.id)
    .map((c) => c.german);
  const pool = [...new Set([...otherGerman, ...DISTRACTOR_POOL])].filter(
    (w) => w !== correct.german,
  );
  const distractors = shuffle(pool).slice(0, 2);
  return shuffle([correct.german, ...distractors]);
}
