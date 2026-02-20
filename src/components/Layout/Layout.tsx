import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Layout.module.css';

export function Layout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${isActive ? styles.active : ''}`;

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <span className={styles.brand}>French Flashcards</span>
        <NavLink to="/study" className={linkClass}>Study</NavLink>
        <NavLink to="/quiz" className={linkClass}>Quiz (MC)</NavLink>
        <NavLink to="/quiz-fill" className={linkClass}>Quiz (Fill)</NavLink>
        <NavLink to="/statistics" className={linkClass}>Statistics</NavLink>
        <NavLink to="/add-card" className={linkClass}>Add Card</NavLink>
        <div className={styles.userSection}>
          <span className={styles.userEmail}>{user?.email}</span>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </nav>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
