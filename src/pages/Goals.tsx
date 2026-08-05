import { useLocalStorage } from '../hooks/useLocalStorage';
import styles from './Page.module.css';

const initialGoals = [
  { id: 'g1', label: 'Finish weekly report', completed: false },
  { id: 'g2', label: 'Review roadmap milestones', completed: true },
  { id: 'g3', label: 'Prepare project notes', completed: false },
];

export default function Goals() {
  const [goals, setGoals] = useLocalStorage('goals-list', initialGoals);

  const toggleGoal = (id: string) => {
    setGoals((current) =>
      current.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal,
      ),
    );
  };

  return (
    <section className={styles.pageSection}>
      <div className={styles.gridRow}>
        <article className={styles.metricCard}>
          <p className={styles.metricLabel}>Daily goals</p>
          <h2 className={styles.metricValue}>{goals.filter((goal) => !goal.completed).length}</h2>
          <p className={styles.metricDetail}>Open goals remaining</p>
        </article>
        <article className={styles.metricCard}>
          <p className={styles.metricLabel}>Weekly milestones</p>
          <h2 className={styles.metricValue}>{goals.length}</h2>
          <p className={styles.metricDetail}>Total active goals</p>
        </article>
      </div>
      <div className={styles.goalEditor}>
        <h2>Goal tracker</h2>
        <ul className={styles.goalList}>
          {goals.map((goal) => (
            <li key={goal.id} className={styles.goalItem}>
              <label>
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => toggleGoal(goal.id)}
                />
                {goal.label}
              </label>
              <span>{goal.completed ? 'Done' : 'Open'}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
