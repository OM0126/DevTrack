import React, { useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import styles from './Page.module.css';
import { getScheduleForDate } from '../constants/schedules';

function parseTimeToMinutes(t: string) {
  const [hh, mm] = t.split(':').map(Number);
  return hh * 60 + mm;
}

function durationMinutes(start: string, end: string) {
  const s = parseTimeToMinutes(start);
  const e = parseTimeToMinutes(end);
  return e <= s ? e + 24 * 60 - s : e - s;
}

const categoryColors: Record<string, string> = {
  DevOps: '#7C3AED',
  'Machine Learning': '#14B8A6',
  DSA: '#38BDF8',
  Development: '#60A5FA',
  College: '#F59E0B',
  Routine: '#A78BFA',
  Meal: '#F97316',
  Travel: '#38BDF8',
  Break: '#64748B',
  Sleep: '#334155',
};

function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export default function Today() {
  const [completed, setCompleted] = useLocalStorage<string[]>('today-schedule-completed', []);
  const completedCount = completed.length;

  const todaySchedule = React.useMemo(() => getScheduleForDate(new Date()), []);

  const schedule = useMemo(
    () =>
      todaySchedule.map((s) => ({
        id: s.id,
        title: s.label,
        time: `${s.start} — ${s.end}`,
        category: s.category,
        duration: durationMinutes(s.start, s.end),
      })),
    [todaySchedule],
  );

  const completionRate = useMemo(() => Math.round((completedCount / schedule.length) * 100), [completedCount, schedule.length]);

  const completedMinutes = useMemo(
    () => schedule.reduce((sum, task) => (completed.includes(task.id) ? sum + task.duration : sum), 0),
    [completed],
  );

  const toggleTask = (id: string) => {
    setCompleted((current) =>
      current.includes(id) ? current.filter((task) => task !== id) : [...current, id],
    );
  };

  const remainingMinutes = Math.max(0, schedule.reduce((sum, task) => sum + task.duration, 0) - completedMinutes);

  return (
    <section className={styles.todaySection}>
      <div className={styles.todayHeader}>
        <div>
          <p className={styles.todayLabel}>Today&apos;s Schedule</p>
          <h2 className={styles.todayTitle}>Wednesday, August 6</h2>
          <p className={styles.todaySubtitle}>Complete the updated weekday strategy with checkpoints and weekly momentum.</p>
        </div>
        <div className={styles.viewControls}>
          {['Day View', 'Week View', 'Month View', 'Customize'].map((label, index) => (
            <button
              key={label}
              type="button"
              className={index === 0 ? styles.primaryChip : styles.secondaryChip}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.todayGrid}>
        <div className={styles.timelineCard}>
          <div className={styles.timelineHeader}>
            <div>
              <h3>Today&apos;s timeline</h3>
              <p>Follow your weekday study plan with a live schedule and task checks.</p>
            </div>
            <div className={styles.timelineSummary}>
              <span>{completionRate}% completed</span>
              <span>{completedCount} / {schedule.length} tasks</span>
            </div>
          </div>

          <div className={styles.timelineList}>
            {schedule.map((task, idx) => {
              const done = completed.includes(task.id);
              return (
                <div key={task.id} className={`${styles.timelineItem} ${done ? styles.doneItem : ''}`}>
                  <div className={styles.timelineTime}>{task.time}</div>
                  <div className={styles.timelineMark}>
                    <span style={{ background: categoryColors[task.category] ?? '#64748b' }} />
                    {idx !== schedule.length - 1 && <div className={styles.timelineLine} />}
                  </div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineTitleRow}>
                      <p>{task.title}</p>
                      <span className={styles.taskDuration}>{formatMinutes(task.duration)}</span>
                    </div>
                    <div className={styles.timelineMeta}>
                      <span
                        className={styles.taskCategory}
                        style={{ color: categoryColors[task.category] ?? '#9ca3b4' }}
                      >
                        {task.category}
                      </span>
                      <button
                        type="button"
                        className={`${styles.taskCheckbox} ${done ? styles.taskChecked : ''}`}
                        onClick={() => toggleTask(task.id)}
                      >
                        <input type="checkbox" checked={done} readOnly />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside className={styles.rightPanel}>
          <div className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.panelLabel}>Today&apos;s progress</p>
                <h3>{completionRate}% complete</h3>
              </div>
              <div className={styles.progressRing}>
                <span>{completionRate}%</span>
              </div>
            </div>
            <div className={styles.progressStats}>
              <div>
                <span>Completed</span>
                <strong>{completedCount}</strong>
              </div>
              <div>
                <span>Remaining</span>
                <strong>{Math.floor(remainingMinutes / 60)}h {remainingMinutes % 60}m</strong>
              </div>
            </div>
          </div>

          <div className={styles.panelCard}>
            <p className={styles.panelLabel}>Weekly overview</p>
            <div className={styles.weeklyOverview}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                <div
                  key={`${day}-${index}`}
                  className={`${styles.dayDot} ${index === 2 ? styles.dayDotActive : ''}`}
                >
                  {day}
                </div>
              ))}
            </div>
            <p className={styles.smallNote}>2 Day Streak · Best 5 Days</p>
          </div>

          <div className={styles.panelCard}>
            <p className={styles.panelLabel}>Total hours (this week)</p>
            <div className={styles.hoursRow}>
              <span>DevOps</span>
              <div className={styles.progressBar}><div style={{ width: '80%', background: '#7C3AED' }} /></div>
              <strong>16h / 20h</strong>
            </div>
            <div className={styles.hoursRow}>
              <span>DSA</span>
              <div className={styles.progressBar}><div style={{ width: '65%', background: '#38BDF8' }} /></div>
              <strong>8h / 10h</strong>
            </div>
            <div className={styles.hoursRow}>
              <span>Development</span>
              <div className={styles.progressBar}><div style={{ width: '45%', background: '#60A5FA' }} /></div>
              <strong>6h / 12h</strong>
            </div>
            <div className={styles.hoursRow}>
              <span>College</span>
              <div className={styles.progressBar}><div style={{ width: '52%', background: '#F59E0B' }} /></div>
              <strong>4h / 8h</strong>
            </div>
          </div>

          <div className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.panelLabel}>Goals</p>
                <h3>Study DevOps for 80 Hours</h3>
              </div>
              <button type="button" className={styles.secondaryChip}>View All</button>
            </div>
            <div className={styles.goalMini}>
              <span>Study DevOps for 80 Hours</span>
              <strong>65 / 80h</strong>
            </div>
            <div className={styles.goalMini}>
              <span>Solve 200 DSA Problems</span>
              <strong>120 / 200</strong>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
