import { useAppContext } from '../../context/AppContext';
import styles from './StatisticsPage.module.css';

export function StatisticsPage() {
  const { cards } = useAppContext();

  // Calculate statistics
  const totalCards = cards.length;
  const categories = Array.from(new Set(cards.map((c) => c.category)));
  const categoryCounts = categories.map((category) => ({
    category,
    count: cards.filter((c) => c.category === category).length,
  }));

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Statistics</h1>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Card Collection</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{totalCards}</div>
            <div className={styles.statLabel}>Total Cards</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{categories.length}</div>
            <div className={styles.statLabel}>Categories</div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Cards by Category</h2>
        <div className={styles.categoryList}>
          {categoryCounts.map(({ category, count }) => (
            <div key={category} className={styles.categoryItem}>
              <span className={styles.categoryName}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
              <div className={styles.categoryBar}>
                <div
                  className={styles.categoryBarFill}
                  style={{
                    width: `${(count / totalCards) * 100}%`,
                  }}
                />
              </div>
              <span className={styles.categoryCount}>{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.infoBox}>
        <p className={styles.infoText}>
          📊 Session statistics will be available after completing study or quiz sessions.
        </p>
        <p className={styles.infoText}>
          💡 Keep practicing to track your progress over time!
        </p>
      </div>
    </div>
  );
}
