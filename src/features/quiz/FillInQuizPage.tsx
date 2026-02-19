import { useReducer, useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useAppContext } from '../../context/AppContext';
import {
  createSession,
  markCorrect,
  markWrong,
  isSessionComplete,
} from '../study/studyEngine';
import { validateAnswer } from '../../utils/validateAnswer';
import { filterCardsByCategory } from '../../utils/filterCardsByCategory';
import type { SessionState } from '../../types/flashcard';
import styles from './FillInQuizPage.module.css';

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
      return createSession(action.cardIds, 'quiz-fill');
    default:
      return state;
  }
}

export function FillInQuizPage() {
  const { cards } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(cards.map((c) => c.category)))];

  // Filter cards by category
  const filteredCards = filterCardsByCategory(cards, selectedCategory);
  const cardIds = filteredCards.map((c) => c.id);

  const [session, dispatch] = useReducer(
    reducer,
    cardIds,
    (ids) => createSession(ids, 'quiz-fill'),
  );

  // Reset session when category changes
  useEffect(() => {
    dispatch({ type: 'RESET', cardIds });
    setIsAnswered(false);
    setUserAnswer('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const currentCard = filteredCards.find((c) => c.id === session.currentCardId);

  const handleRestart = () => {
    window.location.reload();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isAnswered || !currentCard) return;

    const correct = validateAnswer(userAnswer, currentCard.german);
    setIsCorrect(correct);
    setIsAnswered(true);

    // Dispatch after brief delay for UX
    setTimeout(() => {
      dispatch({ type: correct ? 'CORRECT' : 'WRONG' });
      setIsAnswered(false);
      setUserAnswer('');
    }, 2000);
  };

  if (isSessionComplete(session)) {
    const accuracy = session.correctCount + session.incorrectCount > 0
      ? Math.round((session.correctCount / (session.correctCount + session.incorrectCount)) * 100)
      : 0;

    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Quiz Complete!</h1>
        <div className={styles.stats}>
          <p className={styles.stat}>
            ✅ Correct: <strong>{session.correctCount}</strong>
          </p>
          <p className={styles.stat}>
            ❌ Wrong: <strong>{session.incorrectCount}</strong>
          </p>
          <p className={styles.stat}>
            📊 Accuracy: <strong>{accuracy}%</strong>
          </p>
        </div>
        <button className={styles.restartBtn} onClick={handleRestart}>
          Start New Quiz
        </button>
      </div>
    );
  }

  if (!currentCard) return null;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Fill-in Quiz</h1>
      
      <div className={styles.categorySelector}>
        <label htmlFor="category" className={styles.label}>
          Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={styles.select}
          disabled={isAnswered}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Cards' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.quizCard}>
        <p className={styles.question}>What is the German word for:</p>
        <h2 className={styles.french}>{currentCard.french}</h2>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type your answer..."
          className={styles.input}
          disabled={isAnswered}
          autoFocus
        />
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isAnswered || !userAnswer.trim()}
        >
          Submit
        </button>
      </form>

      {isAnswered && (
        <div className={isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}>
          {isCorrect
            ? '✅ Correct!'
            : `❌ Wrong! The correct answer is: ${currentCard.german}`}
        </div>
      )}

      <div className={styles.progress}>
        <p className={styles.progressText}>
          Score: {session.correctCount} / {session.correctCount + session.incorrectCount} • {' '}
          {session.remainingCards.length + 1} remaining
        </p>
      </div>

      <p className={styles.hint}>💡 Press Enter to submit your answer</p>
    </div>
  );
}
