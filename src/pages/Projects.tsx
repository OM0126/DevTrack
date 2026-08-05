import styles from './Page.module.css';

const projects = [
  { title: 'Dashboard redesign', status: 'In progress', link: 'https://github.com/weekly-pipeline/dashboard' },
  { title: 'Learning tracker', status: 'Completed', link: 'https://github.com/weekly-pipeline/learning' },
  { title: 'CLI workflow', status: 'Upcoming', link: 'https://github.com/weekly-pipeline/cli' },
];

export default function Projects() {
  return (
    <section className={styles.pageSection}>
      <div className={styles.projectHeader}>
        <div>
          <p className={styles.statusLabel}>Project status</p>
          <h2 className={styles.statusTitle}>3 active initiatives</h2>
        </div>
      </div>
      <div className={styles.projectGrid}>
        {projects.map((project) => (
          <article key={project.title} className={styles.projectCard}>
            <h3>{project.title}</h3>
            <p>Status: <strong>{project.status}</strong></p>
            <a href={project.link} target="_blank" rel="noreferrer">Repository</a>
          </article>
        ))}
      </div>
    </section>
  );
}
