import { NavLink } from 'react-router-dom';
import { sidebarItems } from '../../constants/nav';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.logo}>WP</div>
        <div>
          <div className={styles.brandName}>Weekly Pipeline</div>
          <div className={styles.brandCaption}>Productivity workspace</div>
        </div>
      </div>

      <nav className={styles.navList}>
        {sidebarItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.footerLabel}>Workspace</div>
        <div className={styles.footerText}>Goals, schedule, notes, and progress in one place.</div>
      </div>
    </aside>
  );
}
