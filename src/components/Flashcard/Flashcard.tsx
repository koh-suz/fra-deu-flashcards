import { useState } from 'react';
import styles from './Flashcard.module.css';

interface FlashcardProps {
  french: string;
  german: string;
  onCorrect: () => void;
  onWrong: () => void;
}

export function Flashcard({ french, german, onCorrect, onWrong }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (!isFlipped) setIsFlipped(true);
  };

  const handleCorrect = () => {
    setIsFlipped(false);
    onCorrect();
  };

  const handleWrong = () => {
    setIsFlipped(false);
    onWrong();
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.scene}
        onClick={handleFlip}
        aria-label={
          isFlipped
            ? `Translation: ${german}`
            : `French word: ${french}. Click to reveal translation.`
        }
        disabled={isFlipped}
      >
        <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
          <div className={`${styles.face} ${styles.front}`}>
            <span className={styles.word}>{french}</span>
            <span className={styles.hint}>click to flip</span>
          </div>
          <div className={`${styles.face} ${styles.back}`}>
            <span className={styles.word}>{german}</span>
          </div>
        </div>
      </button>

      {isFlipped && (
        <div className={styles.buttons}>
          <button
            className={`${styles.btn} ${styles.wrongBtn}`}
            onClick={handleWrong}
          >
            ❌ Wrong
          </button>
          <button
            className={`${styles.btn} ${styles.correctBtn}`}
            onClick={handleCorrect}
          >
            ✅ Correct
          </button>
        </div>
      )}
    </div>
  );
}
