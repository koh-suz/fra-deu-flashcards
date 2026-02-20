import { useState, useRef } from 'react';
import styles from './Flashcard.module.css';

interface FlashcardProps {
  french: string;
  german: string;
  onCorrect: () => void;
  onWrong: () => void;
}

export function Flashcard({ french, german, onCorrect, onWrong }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const sceneRef = useRef<HTMLButtonElement>(null);

  const handleFlip = () => {
    if (!isFlipped) setIsFlipped(true);
  };

  const handleCorrect = () => {
    setIsFlipped(false);
    onCorrect();
    sceneRef.current?.focus();
  };

  const handleWrong = () => {
    setIsFlipped(false);
    onWrong();
    sceneRef.current?.focus();
  };

  return (
    <div className={styles.wrapper}>
      <button
        ref={sceneRef}
        className={styles.scene}
        onClick={handleFlip}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleFlip(); }}
        aria-label={
          isFlipped
            ? `Translation: ${german}`
            : `French word: ${french}. Press Enter or Space to reveal translation.`
        }
        aria-pressed={isFlipped}
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
