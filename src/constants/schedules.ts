export type ScheduleBlock = {
  id: string;
  start: string;
  end: string;
  label: string;
  category: string;
};

const monFri: ScheduleBlock[] = [
  { id: 'b1', start: '07:00', end: '07:20', label: 'Wake Up & Freshen Up', category: 'Routine' },
  { id: 'b2', start: '07:20', end: '07:40', label: 'Breakfast', category: 'Meal' },
  { id: 'b3', start: '07:40', end: '09:40', label: 'DevOps Session 1', category: 'DevOps' },
  { id: 'b4', start: '09:40', end: '10:00', label: 'Short Break', category: 'Break' },
  { id: 'b5', start: '10:00', end: '11:30', label: 'Development (Python + Django)', category: 'Development' },
  { id: 'b6', start: '11:30', end: '12:50', label: 'Travel / Get Ready / Quick Revision', category: 'Routine' },
  { id: 'b7', start: '12:50', end: '18:30', label: 'College', category: 'College' },
  { id: 'b8', start: '18:30', end: '19:15', label: 'Travel + Freshen Up', category: 'Travel' },
  { id: 'b9', start: '19:15', end: '20:00', label: 'Dinner', category: 'Meal' },
  { id: 'b10', start: '20:00', end: '22:00', label: 'DSA Practice', category: 'DSA' },
  { id: 'b11', start: '22:00', end: '01:00', label: 'DevOps Session 2', category: 'DevOps' },
  { id: 'b12', start: '01:00', end: '07:00', label: 'Sleep', category: 'Sleep' },
];

const thursday: ScheduleBlock[] = [
  { id: 'b1', start: '07:00', end: '07:20', label: 'Wake Up & Freshen Up', category: 'Routine' },
  { id: 'b2', start: '07:20', end: '07:40', label: 'Breakfast', category: 'Meal' },
  { id: 'b3', start: '07:40', end: '09:40', label: 'DevOps Session 1', category: 'DevOps' },
  { id: 'b4', start: '09:40', end: '10:00', label: 'Break', category: 'Break' },
  { id: 'b5', start: '10:30', end: '11:30', label: 'College Class', category: 'College' },
  { id: 'thu-free', start: '11:30', end: '12:50', label: 'Free Period', category: 'Free' },
  { id: 'b7', start: '12:50', end: '13:30', label: 'Lunch', category: 'Meal' },
  { id: 'b8', start: '13:30', end: '18:30', label: 'College', category: 'College' },
  { id: 'b9', start: '18:30', end: '19:15', label: 'Travel', category: 'Travel' },
  { id: 'b10', start: '19:15', end: '20:00', label: 'Dinner', category: 'Meal' },
  { id: 'b11', start: '20:00', end: '22:00', label: 'DSA Practice', category: 'DSA' },
  { id: 'b12', start: '22:00', end: '23:00', label: 'Machine Learning', category: 'Machine Learning' },
  { id: 'b13', start: '23:00', end: '01:00', label: 'DevOps Session 2', category: 'DevOps' },
  { id: 'b14', start: '01:00', end: '07:00', label: 'Sleep', category: 'Sleep' },
];

const saturday: ScheduleBlock[] = [
  { id: 's1', start: '07:00', end: '07:30', label: 'Wake Up', category: 'Routine' },
  { id: 's2', start: '07:30', end: '08:00', label: 'Breakfast', category: 'Meal' },
  { id: 's3', start: '08:00', end: '10:00', label: 'DevOps Revision', category: 'DevOps' },
  { id: 's4', start: '10:00', end: '11:00', label: 'Machine Learning', category: 'Machine Learning' },
  { id: 's5', start: '11:00', end: '13:00', label: 'DSA', category: 'DSA' },
  { id: 's6', start: '13:00', end: '14:00', label: 'Lunch', category: 'Meal' },
  { id: 's7', start: '14:00', end: '18:00', label: 'DevOps Project Building', category: 'DevOps' },
  { id: 's8', start: '18:00', end: '19:00', label: 'Development Revision', category: 'Development' },
  { id: 's9', start: '19:00', end: '20:00', label: 'Dinner', category: 'Meal' },
  { id: 's10', start: '20:00', end: '22:00', label: 'Project Improvement', category: 'DevOps' },
  { id: 's11', start: '22:00', end: '23:00', label: 'Machine Learning', category: 'Machine Learning' },
  { id: 's12', start: '23:00', end: '01:00', label: 'GitHub Push / Docs', category: 'DevOps' },
  { id: 's13', start: '01:00', end: '07:00', label: 'Sleep', category: 'Sleep' },
];

const sunday: ScheduleBlock[] = [
  { id: 'su1', start: '07:00', end: '07:30', label: 'Wake Up', category: 'Routine' },
  { id: 'su2', start: '07:30', end: '08:00', label: 'Breakfast', category: 'Meal' },
  { id: 'su3', start: '08:00', end: '10:00', label: 'Machine Learning', category: 'Machine Learning' },
  { id: 'su4', start: '10:00', end: '12:00', label: 'Complete DevOps Project', category: 'DevOps' },
  { id: 'su5', start: '12:00', end: '13:00', label: 'Project Documentation', category: 'DevOps' },
  { id: 'su6', start: '13:00', end: '14:00', label: 'Lunch', category: 'Meal' },
  { id: 'su7', start: '14:00', end: '16:00', label: 'GitHub Push / Deployment', category: 'DevOps' },
  { id: 'su8', start: '16:00', end: '17:00', label: 'Weekly Revision', category: 'Routine' },
  { id: 'su9', start: '17:00', end: '18:00', label: 'Plan Next Week', category: 'Routine' },
  { id: 'su10', start: '18:00', end: '19:00', label: 'College Studies', category: 'College' },
  { id: 'su11', start: '19:00', end: '20:00', label: 'Dinner', category: 'Meal' },
  { id: 'su12', start: '20:00', end: '22:00', label: 'DSA Revision', category: 'DSA' },
  { id: 'su13', start: '22:00', end: '23:00', label: 'Machine Learning', category: 'Machine Learning' },
  { id: 'su14', start: '23:00', end: '01:00', label: 'Free / Wind Down', category: 'Free' },
  { id: 'su15', start: '01:00', end: '07:00', label: 'Sleep', category: 'Sleep' },
];

export function getScheduleForDate(d: Date) {
  const day = d.getDay(); // 0 = Sunday, 1 = Monday ...
  if (day === 0) return sunday;
  if (day === 6) return saturday;
  if (day === 4) return thursday;
  return monFri;
}

export const FREE_PERIOD_OPTIONS = [
  'Machine Learning',
  'College Studies',
  'DSA Revision',
  'DevOps Documentation',
  'LeetCode',
  'Reading Notes',
];
