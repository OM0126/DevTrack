import styles from './Page.module.css';

const stats = [
  { label: 'Weekly focus', value: '32h', detail: 'Active study and build time' },
  { label: 'Tasks complete', value: '18', detail: 'Today + backlog progress' },
  { label: 'Projects active', value: '4', detail: 'Tracking current work' },
  { label: 'Notes saved', value: '12', detail: 'Recent ideas and logs' },
];

export default function Dashboard() {
  return (
    <section className={styles.pageSection}>
      <div className={styles.gridRow}>
        {stats.map((item) => (
          <article key={item.label} className={styles.metricCard}>
            <p className={styles.metricLabel}>{item.label}</p>
            <h2 className={styles.metricValue}>{item.value}</h2>
            <p className={styles.metricDetail}>{item.detail}</p>
          </article>
        ))}
      </div>
      <div className={styles.welcomeCard}>
        <h2>Welcome back.</h2>
        <p>Use the sidebar to navigate between schedule, roadmaps, projects, analytics, and more. Your workspace is ready.</p>
      </div>
    </section>
  );
}
