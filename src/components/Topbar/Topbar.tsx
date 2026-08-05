import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Topbar.module.css';

const pageTitles: Record<string, string> = {
  '/': "Today's Schedule",
};

export default function Topbar() {
  const location = useLocation();
  const title = useMemo(() => pageTitles[location.pathname] || 'Workspace', [location.pathname]);

  return (
    <header className={styles.topbar}>
      <div>
        <p className={styles.pageLabel}>Workspace</p>
        <h1 className={styles.pageTitle}>{title}</h1>
      </div>
      <div className={styles.topbarActions}>
        <button type="button" className={styles.actionButton}>Search</button>
        <button type="button" className={styles.actionButton}>Notifications</button>
      </div>
    </header>
  );
}
