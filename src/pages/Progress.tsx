import styles from './Page.module.css';

const progressMetrics = [
  { label: 'Daily focus', value: 84 },
  { label: 'Weekly completion', value: 62 },
  { label: 'Monthly momentum', value: 74 },
  { label: 'Streak history', value: 12 },
];

export default function Progress() {
  return (
    <section className={styles.pageSection}>
      <div className={styles.gridRow}>
        {progressMetrics.map((metric) => (
          <article key={metric.label} className={styles.metricCard}>
            <p className={styles.metricLabel}>{metric.label}</p>
            <h2 className={styles.metricValue}>{metric.value}{metric.label === 'Streak history' ? ' days' : '%'}</h2>
          </article>
        ))}
      </div>
      <div className={styles.welcomeCard}>
        <h2>Progress insights</h2>
        <p>Track daily, weekly, and monthly progress from the same workspace. Everything updates from real activity data.</p>
      </div>
    </section>
  );
}
