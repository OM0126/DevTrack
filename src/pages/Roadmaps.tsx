import { useLocalStorage } from '../hooks/useLocalStorage';
import styles from './Page.module.css';

const roadmapItems = [
  { id: 'devops', title: 'DevOps roadmap', progress: 72 },
  { id: 'ml', title: 'Machine learning roadmap', progress: 48 },
  { id: 'dev', title: 'Development roadmap', progress: 83 },
  { id: 'dsa', title: 'DSA roadmap', progress: 56 },
];

export default function Roadmaps() {
  const [activeRoadmap, setActiveRoadmap] = useLocalStorage('roadmaps-active', 'devops');

  return (
    <section className={styles.pageSection}>
      <div className={styles.gridRow}>
        {roadmapItems.map((roadmap) => (
          <button
            key={roadmap.id}
            type="button"
            className={`${styles.roadmapCard} ${activeRoadmap === roadmap.id ? styles.roadmapActive : ''}`}
            onClick={() => setActiveRoadmap(roadmap.id)}
          >
            <p className={styles.metricLabel}>{roadmap.title}</p>
            <h2 className={styles.metricValue}>{roadmap.progress}%</h2>
            <div className={styles.progressBar}>
              <div style={{ width: `${roadmap.progress}%` }} />
            </div>
          </button>
        ))}
      </div>
      <div className={styles.welcomeCard}>
        <h2>Roadmap status</h2>
        <p>Select a learning path to make it the active focus and track completion.</p>
      </div>
    </section>
  );
}
