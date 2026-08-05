import { useLocalStorage } from '../hooks/useLocalStorage';
import styles from './Page.module.css';

interface ResourceItem {
  id: string;
  title: string;
  type: string;
  url: string;
  bookmarked?: boolean;
}

const defaultResources: ResourceItem[] = [
  { id: 'r1', title: 'React Router Docs', type: 'Documentation', url: 'https://reactrouter.com/', bookmarked: true },
  { id: 'r2', title: 'Vite Guide', type: 'Documentation', url: 'https://vitejs.dev/', bookmarked: false },
  { id: 'r3', title: 'DevOps playlist', type: 'YouTube', url: 'https://www.youtube.com/', bookmarked: false },
  { id: 'r4', title: 'Design system notes', type: 'PDF', url: 'https://example.com/', bookmarked: false },
];

export default function Resources() {
  const [resources, setResources] = useLocalStorage('resources-list', defaultResources);

  const toggleBookmark = (id: string) => {
    setResources((current) =>
      current.map((resource) =>
        resource.id === id ? { ...resource, bookmarked: !resource.bookmarked } : resource,
      ),
    );
  };

  return (
    <section className={styles.pageSection}>
      <div className={styles.gridRow}>
        <article className={styles.metricCard}>
          <p className={styles.metricLabel}>Resources</p>
          <h2 className={styles.metricValue}>{resources.length}</h2>
          <p className={styles.metricDetail}>Saved learning assets across categories.</p>
        </article>
        <article className={styles.metricCard}>
          <p className={styles.metricLabel}>Bookmarks</p>
          <h2 className={styles.metricValue}>{resources.filter((resource) => resource.bookmarked).length}</h2>
          <p className={styles.metricDetail}>Important materials marked for quick access.</p>
        </article>
      </div>
      <div className={styles.resourcesList}>
        {resources.map((resource) => (
          <div key={resource.id} className={styles.resourceCard}>
            <div>
              <p className={styles.resourceTitle}>{resource.title}</p>
              <span>{resource.type}</span>
            </div>
            <div className={styles.resourceActions}>
              <a href={resource.url} target="_blank" rel="noreferrer">Open</a>
              <button type="button" onClick={() => toggleBookmark(resource.id)}>
                {resource.bookmarked ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
