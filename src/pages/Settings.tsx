import { useContext } from 'react';
import AppContext from '../context/AppContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import styles from './Page.module.css';

export default function Settings() {
  const { theme, setTheme } = useContext(AppContext);
  const [backup, setBackup] = useLocalStorage('settings-backup', '');

  const onExport = () => {
    const payload = JSON.stringify({ theme }, null, 2);
    setBackup(payload);
  };

  const onImport = () => {
    try {
      const data = JSON.parse(backup);
      if (data.theme === 'dark' || data.theme === 'light') {
        setTheme(data.theme);
      }
    } catch {
      // ignore invalid payload
    }
  };

  const onReset = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <section className={styles.pageSection}>
      <div className={styles.gridRow}>
        <article className={styles.metricCard}>
          <p className={styles.metricLabel}>Theme</p>
          <h2 className={styles.metricValue}>{theme}</h2>
          <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={styles.primaryButton}>
            Toggle theme
          </button>
        </article>
        <article className={styles.metricCard}>
          <p className={styles.metricLabel}>Export / import</p>
          <h2 className={styles.metricValue}>Save settings</h2>
          <button type="button" onClick={onExport} className={styles.secondaryButton}>Export</button>
        </article>
      </div>
      <div className={styles.settingsPanel}>
        <div>
          <h2>Backup data</h2>
          <p>Copy JSON to preserve your current theme and workspace settings.</p>
        </div>
        <textarea
          className={styles.settingsTextarea}
          value={backup}
          onChange={(event) => setBackup(event.target.value)}
          placeholder="Exported settings payload"
          rows={6}
        />
        <div className={styles.settingsActions}>
          <button type="button" onClick={onImport} className={styles.primaryButton}>Import</button>
          <button type="button" onClick={onReset} className={styles.dangerButton}>Reset all data</button>
        </div>
      </div>
    </section>
  );
}
