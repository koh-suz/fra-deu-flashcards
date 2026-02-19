import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export function Layout() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${isActive ? styles.active : ''}`;

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <span className={styles.brand}>French Flashcards</span>
        <NavLink to="/study" className={linkClass}>
          Study
        </NavLink>
        <NavLink to="/quiz" className={linkClass}>
          Quiz (MC)
        </NavLink>
        <NavLink to="/quiz-fill" className={linkClass}>
          Quiz (Fill)
        </NavLink>
        <NavLink to="/statistics" className={linkClass}>
          Statistics
        </NavLink>
        <NavLink to="/add-card" className={linkClass}>
          Add Card
        </NavLink>
      </nav>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
