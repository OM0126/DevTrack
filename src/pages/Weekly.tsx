import styles from './Page.module.css';

const goals = [
  { title: 'Publish weekly review', status: 'In progress' },
  { title: 'Prepare Monday study plan', status: 'Complete' },
  { title: 'Finish roadmap update', status: 'Pending' },
];

export default function Weekly() {
  return (
    <section className={styles.pageSection}>
      <div className={styles.gridRow}>
        <article className={styles.metricCard}>
          <p className={styles.metricLabel}>Weekly planner</p>
          <h2 className={styles.metricValue}>7 day view</h2>
          <p className={styles.metricDetail}>Review tasks and progress for each day of the week.</p>
        </article>
        <article className={styles.metricCard}>
          <p className={styles.metricLabel}>Active goals</p>
          <h2 className={styles.metricValue}>3 goals</h2>
          <p className={styles.metricDetail}>Track focus items and keep weekly outcomes on target.</p>
        </article>
      </div>
      <div className={styles.planCard}>
        <div className={styles.planHeader}>
          <h2>Weekly goals</h2>
          <p>Align work, learning, and sprint priorities.</p>
        </div>
        <ul className={styles.goalList}>
          {goals.map((goal) => (
            <li key={goal.title} className={styles.goalItem}>
              <span>{goal.title}</span>
              <span>{goal.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
