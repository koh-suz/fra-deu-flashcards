import { useReducer } from 'react';
import { Flashcard } from '../../components/Flashcard/Flashcard';
import { useAppContext } from '../../context/AppContext';
import {
  createSession,
  markCorrect,
  markWrong,
  isSessionComplete,
} from './studyEngine';
import type { SessionState } from '../../types/flashcard';
import styles from './StudyPage.module.css';

type Action = { type: 'CORRECT' } | { type: 'WRONG' } | { type: 'RESTART' };

function reducer(state: SessionState, action: Action): SessionState {
  switch (action.type) {
    case 'CORRECT':
      return markCorrect(state);
    case 'WRONG':
      return markWrong(state);
    case 'RESTART':
      return state;
    default:
      return state;
  }
}

export function StudyPage() {
  const { cards } = useAppContext();
  const cardIds = cards.map((c) => c.id);

  const [session, dispatch] = useReducer(
    reducer,
    cardIds,
    (ids) => createSession(ids, 'study'),
  );

  const currentCard = cards.find((c) => c.id === session.currentCardId);

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
