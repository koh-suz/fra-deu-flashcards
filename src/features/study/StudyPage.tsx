import { useReducer, useState, useEffect } from 'react';
import { Flashcard } from '../../components/Flashcard/Flashcard';
import { useAppContext } from '../../context/AppContext';
import {
  createSession,
  markCorrect,
  markWrong,
  isSessionComplete,
} from './studyEngine';
import { filterCardsByCategory } from '../../utils/filterCardsByCategory';
import type { SessionState } from '../../types/flashcard';
import styles from './StudyPage.module.css';

type Action =
  | { type: 'CORRECT' }
  | { type: 'WRONG' }
  | { type: 'RESET'; cardIds: string[] };

function reducer(state: SessionState, action: Action): SessionState {
  switch (action.type) {
    case 'CORRECT':
      return markCorrect(state);
    case 'WRONG':
      return markWrong(state);
    case 'RESET':
      return createSession(action.cardIds, 'study');
    default:
      return state;
  }
}

export function StudyPage() {
  const { cards } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories from cards
  const categories = ['all', ...Array.from(new Set(cards.map((c) => c.category)))];

  // Filter cards by selected category
  const filteredCards = filterCardsByCategory(cards, selectedCategory);
  const cardIds = filteredCards.map((c) => c.id);

  const [session, dispatch] = useReducer(
    reducer,
    cardIds,
    (ids) => createSession(ids, 'study'),
  );

  // Reset session when category changes
  useEffect(() => {
    dispatch({ type: 'RESET', cardIds });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const currentCard = filteredCards.find((c) => c.id === session.currentCardId);

  const handleRestart = () => {
    window.location.reload();
  };

  if (isSessionComplete(session)) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Session Complete!</h1>
        <div className={styles.stats}>
          <p className={styles.stat}>
            ✅ Correct: <strong>{session.correctCount}</strong>
          </p>
          <p className={styles.stat}>
            ❌ Wrong: <strong>{session.incorrectCount}</strong>
          </p>
          <p className={styles.stat}>
            🔄 Cards repeated: <strong>{session.wrongCards.length}</strong>
          </p>
        </div>
        <button className={styles.restartBtn} onClick={handleRestart}>
          Start New Session
        </button>
      </div>
    );
  }

  if (!currentCard) return null;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Study</h1>
      <div className={styles.categorySelector}>
        <label htmlFor="category" className={styles.label}>
          Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={styles.select}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Cards' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <Flashcard
        key={currentCard.id}
        french={currentCard.french}
        german={currentCard.german}
        onCorrect={() => dispatch({ type: 'CORRECT' })}
        onWrong={() => dispatch({ type: 'WRONG' })}
      />
      <div className={styles.progress}>
        <p className={styles.progressText}>
          {session.correctCount} correct • {session.remainingCards.length + 1}{' '}
          remaining
        </p>
        {session.incorrectCount > 0 && (
          <p className={styles.wrongCount}>
            ❌ {session.incorrectCount} wrong (repeating)
          </p>
        )}
      </div>
    </div>
  );
}
