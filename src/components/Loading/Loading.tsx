import styles from './Loading.module.css';

export function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Loading flashcards...</p>
    </div>
  );
}
