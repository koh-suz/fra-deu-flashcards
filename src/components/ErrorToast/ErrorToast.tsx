import styles from './ErrorToast.module.css';

interface ErrorToastProps {
  message: string;
  onRetry: () => void;
  onDismiss: () => void;
}

export function ErrorToast({ message, onRetry, onDismiss }: ErrorToastProps) {
  return (
    <div className={styles.toast}>
      <div className={styles.content}>
        <span className={styles.message}>{message}</span>
        <button className={styles.dismiss} onClick={onDismiss} aria-label="Dismiss">
          ✕
        </button>
      </div>
      <button className={styles.retryBtn} onClick={onRetry}>
        Retry Connection
      </button>
    </div>
  );
}
