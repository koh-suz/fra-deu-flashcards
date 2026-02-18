import { useState } from 'react';
import { Flashcard } from '../../components/Flashcard/Flashcard';
import { initialCards } from '../../data/initialCards';
import styles from './StudyPage.module.css';

export function StudyPage() {
  const [index, setIndex] = useState(0);

  const card = initialCards[index];

  const advance = () => {
    setIndex((prev) => (prev + 1) % initialCards.length);
  };

  if (!card) return null;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Study</h1>
      <Flashcard
        key={card.id}
        french={card.french}
        german={card.german}
        onCorrect={advance}
        onWrong={advance}
      />
      <p className={styles.progress}>
        Card {index + 1} of {initialCards.length}
      </p>
    </div>
  );
}
