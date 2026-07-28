import React, { useState, useEffect, useCallback } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

/* ============ schedule data ============ */

const weekdayA = [
  { id: 'wd1',  start: '08:00', end: '08:15', label: 'Wake up & freshen up',       type: 'routine' },
  { id: 'wd2',  start: '08:15', end: '08:35', label: 'Breakfast',                   type: 'meal' },
  { id: 'wd3',  start: '08:35', end: '10:20', label: 'DevOps',                      type: 'devops' },
  { id: 'wd4',  start: '10:20', end: '10:30', label: 'Short break',                 type: 'break' },
  { id: 'wd5',  start: '10:30', end: '11:30', label: 'DSA practice',                type: 'dsa' },
  { id: 'wd6',  start: '11:30', end: '12:50', label: 'Travel to college',           type: 'travel' },
  { id: 'wd7',  start: '12:50', end: '18:30', label: 'College',                     type: 'college' },
  { id: 'wd8',  start: '18:30', end: '19:15', label: 'Travel back & freshen up',    type: 'travel' },
  { id: 'wd9',  start: '19:15', end: '20:00', label: 'Development (Python/Django)', type: 'dev' },
  { id: 'wd10', start: '20:00', end: '20:30', label: 'Dinner',                      type: 'meal' },
  { id: 'wd11', start: '20:30', end: '23:15', label: 'DevOps',                      type: 'devops' },
  { id: 'wd12', start: '23:15', end: '23:25', label: 'Short break',                 type: 'break' },
  { id: 'wd13', start: '23:25', end: '00:40', label: 'DSA practice',                type: 'dsa' },
  { id: 'wd14', start: '00:40', end: '01:10', label: 'Machine Learning',            type: 'ml' },
  { id: 'wd15', start: '01:10', end: '02:00', label: 'Free time / wind down',       type: 'free' },
  { id: 'wd16', start: '02:00', end: '08:00', label: 'Sleep (6 hrs)',               type: 'sleep' },
];
const weekdayB = weekdayA.map(b => b.id === 'wd13' ? { ...b, label: 'Development practice', type: 'dev' } : b);

const saturday = [
  { id: 'sa1',  start: '09:00', end: '09:30', label: 'Wake up & freshen up',        type: 'routine' },
  { id: 'sa2',  start: '09:30', end: '10:00', label: 'Breakfast',                   type: 'meal' },
  { id: 'sa3',  start: '10:00', end: '12:00', label: 'DevOps',                      type: 'devops' },
  { id: 'sa4',  start: '12:00', end: '12:15', label: 'Short break',                 type: 'break' },
  { id: 'sa5',  start: '12:15', end: '13:30', label: 'DSA practice',                type: 'dsa' },
  { id: 'sa6',  start: '13:30', end: '14:15', label: 'Lunch',                       type: 'meal' },
  { id: 'sa7',  start: '14:15', end: '16:00', label: 'College studies / academics', type: 'studies' },
  { id: 'sa8',  start: '16:00', end: '17:00', label: 'Free time / exercise',        type: 'free' },
  { id: 'sa9',  start: '17:00', end: '18:30', label: 'Development (Python/Django)', type: 'dev' },
  { id: 'sa10', start: '18:30', end: '19:15', label: 'Machine Learning',            type: 'ml' },
  { id: 'sa11', start: '19:15', end: '20:00', label: 'Free time',                   type: 'free' },
  { id: 'sa12', start: '20:00', end: '20:30', label: 'Dinner',                      type: 'meal' },
  { id: 'sa13', start: '20:30', end: '22:30', label: 'DevOps',                      type: 'devops' },
  { id: 'sa14', start: '22:30', end: '02:00', label: 'Free time / wind down',       type: 'free' },
  { id: 'sa15', start: '02:00', end: '09:00', label: 'Sleep (7 hrs)',               type: 'sleep' },
];

const sunday = [
  { id: 'su1',  start: '09:00', end: '09:30', label: 'Wake up & freshen up',        type: 'routine' },
  { id: 'su2',  start: '09:30', end: '10:00', label: 'Breakfast',                   type: 'meal' },
  { id: 'su3',  start: '10:00', end: '12:00', label: 'DevOps',                      type: 'devops' },
  { id: 'su4',  start: '12:00', end: '12:15', label: 'Short break',                 type: 'break' },
  { id: 'su5',  start: '12:15', end: '14:15', label: 'Machine Learning',            type: 'ml' },
  { id: 'su6',  start: '14:15', end: '15:00', label: 'Lunch',                       type: 'meal' },
  { id: 'su7',  start: '15:00', end: '16:45', label: 'College studies / academics', type: 'studies' },
  { id: 'su8',  start: '16:45', end: '18:00', label: 'Free time / exercise',        type: 'free' },
  { id: 'su9',  start: '18:00', end: '19:00', label: 'DSA practice',                type: 'dsa' },
  { id: 'su10', start: '19:00', end: '20:00', label: 'Free time',                   type: 'free' },
  { id: 'su11', start: '20:00', end: '20:30', label: 'Dinner',                      type: 'meal' },
  { id: 'su12', start: '20:30', end: '22:00', label: 'Development (Python/Django)', type: 'dev' },
  { id: 'su13', start: '22:00', end: '23:30', label: 'DevOps',                      type: 'devops' },
  { id: 'su14', start: '23:30', end: '02:00', label: 'Free time / wind down / plan next week', type: 'free' },
  { id: 'su15', start: '02:00', end: '09:00', label: 'Sleep (7 hrs)',               type: 'sleep' },
];

const TEMPLATES = { weekdayA, weekdayB, saturday, sunday };

const CATS = {
  devops:  { label: 'DevOps',  hue: '#38BDF8', focus: true },
  dsa:     { label: 'DSA',     hue: '#A78BFA', focus: true },
  dev:     { label: 'Dev',     hue: '#34D399', focus: true },
  ml:      { label: 'ML',      hue: '#FB923C', focus: true },
  studies: { label: 'Studies', hue: '#FB7185', focus: true },
  college: { label: 'College', hue: '#64748B', focus: false },
  sleep:   { label: 'Sleep',   hue: '#475569', focus: false },
  meal:    { label: 'Meal',    hue: '#5B6472', focus: false },
  travel:  { label: 'Travel',  hue: '#5B6472', focus: false },
  routine: { label: 'Routine', hue: '#4B5563', focus: false },
  free:    { label: 'Free',    hue: '#5B6472', focus: false },
  break:   { label: 'Break',   hue: '#3F4757', focus: false },
};

const FOCUS_TYPES = new Set(['devops', 'dsa', 'dev', 'ml', 'studies']);

const LEGEND = [
  { label: 'DEVOPS',   hue: CATS.devops.hue,  text: 'Linux & shell, Git, Docker, Kubernetes basics, CI/CD (GitHub Actions/Jenkins), one cloud provider, Terraform/Ansible, monitoring.' },
  { label: 'DSA',      hue: CATS.dsa.hue,     text: 'Arrays, strings, recursion, trees, graphs, DP — solved in Python on LeetCode/GfG.' },
  { label: 'DEV',      hue: CATS.dev.hue,     text: 'Python + Django — models, views, REST APIs, auth. Build one project you can later containerize and deploy.' },
  { label: 'ML',       hue: CATS.ml.hue,      text: 'NumPy/Pandas, one scikit-learn project end-to-end, once a week.' },
  { label: 'STUDIES',  hue: CATS.studies.hue, text: 'Semester subjects and exam prep — weekend blocks only.' },
];

/* ============ helpers ============ */

function fmtDate(d) {
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function getWeekStart(d) {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return date;
}
function templateKeyForDate(d) {
  const day = d.getDay();
  if (day === 0) return 'sunday';
  if (day === 6) return 'saturday';
  if (day === 2 || day === 4) return 'weekdayB';
  return 'weekdayA';
}
function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}
function blockDuration(b) {
  let s = toMinutes(b.start), e = toMinutes(b.end);
  if (e <= s) e += 1440;
  return e - s;
}
function formatTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  let h12 = h % 12; if (h12 === 0) h12 = 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}
function formatRange(s, e) { return `${formatTime(s)} – ${formatTime(e)}`; }
function isCurrentBlock(block, refDate) {
  const nowMin = refDate.getHours() * 60 + refDate.getMinutes();
  const start = toMinutes(block.start);
  let end = toMinutes(block.end);
  if (end <= start) return nowMin >= start || nowMin < end;
  return nowMin >= start && nowMin < end;
}
function hexToRgba(hex, a) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16), g = parseInt(h.substring(2, 4), 16), b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

/* ============ component ============ */

export default function WeeklyPipeline() {
  const [selectedDate, setSelectedDate] = useState(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; });
  const [completed, setCompleted] = useState([]);
  const [dayLoading, setDayLoading] = useState(true);
  const [weekStats, setWeekStats] = useState({ devops: 0, dsa: 0, dev: 0, ml: 0, studies: 0 });
  const [weekDays, setWeekDays] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [showLegend, setShowLegend] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const dateStr = fmtDate(selectedDate);
  const templateKey = templateKeyForDate(selectedDate);
  const blocks = TEMPLATES[templateKey];
  const isToday = fmtDate(now) === dateStr;

  useEffect(() => {
    let cancelled = false;
    setDayLoading(true);
    (async () => {
      try {
        const res = localStorage.getItem(`progress-${dateStr}`);
        const completed = res ? JSON.parse(res) : [];
        if (!cancelled) setCompleted(completed);
      } catch (e) {
        if (!cancelled) setCompleted([]);
      } finally {
        if (!cancelled) setDayLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [dateStr]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setStatsLoading(true);
      const weekStart = getWeekStart(new Date());
      const totals = { devops: 0, dsa: 0, dev: 0, ml: 0, studies: 0 };
      const days = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date(weekStart); d.setDate(d.getDate() + i);
        const ds = fmtDate(d);
        const dayBlocks = TEMPLATES[templateKeyForDate(d)];
        let ids = [];
        try {
  const res = localStorage.getItem(`progress-${ds}`);
  ids = res ? JSON.parse(res) : [];
} catch (e) {
  ids = [];
}
        ids.forEach(id => {
          const b = dayBlocks.find(bl => bl.id === id);
          if (b && totals[b.type] !== undefined) totals[b.type] += blockDuration(b);
        });
        days.push({ date: d, dateStr: ds, pct: dayBlocks.length ? Math.round((ids.length / dayBlocks.length) * 100) : 0 });
      }
      if (!cancelled) { setWeekStats(totals); setWeekDays(days); setStatsLoading(false); }
    })();
    return () => { cancelled = true; };
  }, []);

  const toggleBlock = useCallback((block) => {
    setCompleted(prev => {
      const has = prev.includes(block.id);
      const next = has ? prev.filter(id => id !== block.id) : [...prev, block.id];
      localStorage.setItem(`progress-${dateStr}`, JSON.stringify(next));
      const weekStart = getWeekStart(new Date());
      const weekEnd = new Date(weekStart); weekEnd.setDate(weekEnd.getDate() + 7);
      if (selectedDate >= weekStart && selectedDate < weekEnd) {
        if (FOCUS_TYPES.has(block.type)) {
          const delta = blockDuration(block) * (has ? -1 : 1);
          setWeekStats(ws => ({ ...ws, [block.type]: Math.max(0, (ws[block.type] || 0) + delta) }));
        }
        setWeekDays(wd => wd.map(day => day.dateStr === dateStr
          ? { ...day, pct: blocks.length ? Math.round((next.length / blocks.length) * 100) : 0 }
          : day));
      }
      return next;
    });
  }, [dateStr, selectedDate, blocks]);

  const changeDay = (delta) => setSelectedDate(prev => { const d = new Date(prev); d.setDate(d.getDate() + delta); return d; });
  const goToday = () => { const d = new Date(); d.setHours(0, 0, 0, 0); setSelectedDate(d); };

  const dayDone = completed.length;
  const dayTotal = blocks.length;
  const focusTotal = weekStats.devops + weekStats.dsa + weekStats.dev;
  const devopsPct = focusTotal ? Math.round((weekStats.devops / focusTotal) * 100) : 0;

  return (
    <div style={{ minHeight: '100vh', background: '#0B0E14', color: '#E7EAF0', padding: '24px 16px 48px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .pt-mono { font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
        .pt-display { font-family: 'Space Grotesk', -apple-system, sans-serif; }
        .pt-btn { background: transparent; border: none; cursor: pointer; padding: 0; color: inherit; font: inherit; }
        .pt-btn:focus-visible { outline: 2px solid #38BDF8; outline-offset: 2px; border-radius: 4px; }
        @keyframes pt-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }
        .pt-live-dot { animation: pt-pulse 1.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .pt-live-dot { animation: none; } }
      `}</style>

      <div style={{ maxWidth: 560, margin: '0 auto' }}>

        {/* header */}
        <div className="pt-mono" style={{ fontSize: 12, color: '#5B6472' }}># devops 60 · dsa+dev 40 · weekly ml · weekend studies</div>
        <h1 className="pt-display" style={{ fontSize: 26, fontWeight: 600, marginTop: 4, letterSpacing: '-0.01em' }}>Weekly Pipeline</h1>
        <p style={{ fontSize: 13, color: '#7C8797', marginTop: 4, lineHeight: 1.5 }}>Tap any stage to mark it done. Progress is tracked per day, automatically.</p>

        {/* date nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 22 }}>
          <button className="pt-btn" onClick={() => changeDay(-1)} aria-label="Previous day" style={{ padding: 8 }}>
            <ChevronLeft size={18} color="#7C8797" />
          </button>
          <div style={{ textAlign: 'center' }}>
            <div className="pt-display" style={{ fontSize: 16, fontWeight: 600 }}>{selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}</div>
            <div className="pt-mono" style={{ fontSize: 11, color: '#7C8797', marginTop: 2 }}>
              {dateStr}
              {!isToday && <button className="pt-btn" onClick={goToday} style={{ marginLeft: 8, color: '#38BDF8', textDecoration: 'underline' }}>today</button>}
            </div>
          </div>
          <button className="pt-btn" onClick={() => changeDay(1)} aria-label="Next day" style={{ padding: 8 }}>
            <ChevronRight size={18} color="#7C8797" />
          </button>
        </div>

        {/* week strip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6, marginTop: 18 }}>
          {(weekDays.length ? weekDays : Array.from({ length: 7 })).map((day, i) => (
            <button
              key={day ? day.dateStr : i}
              className="pt-btn"
              disabled={!day}
              onClick={() => day && setSelectedDate(new Date(day.date))}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
            >
              <span className="pt-mono" style={{ fontSize: 9, color: '#4B5563' }}>
                {day ? day.date.toLocaleDateString('en-US', { weekday: 'narrow' }) : ' '}
              </span>
              <span style={{
                width: '100%', aspectRatio: '1', maxWidth: 30, borderRadius: 6,
                background: day ? (day.pct === 0 ? '#171E2B' : hexToRgba('#34D399', 0.15 + 0.65 * (day.pct / 100))) : '#131926',
                border: day && day.dateStr === dateStr ? '1.5px solid #38BDF8' : '1px solid #212938',
              }} />
            </button>
          ))}
        </div>

        {/* today run */}
        <div style={{ background: '#131926', border: '1px solid #212938', borderRadius: 10, padding: 14, marginTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="pt-mono" style={{ fontSize: 11, color: '#7C8797', letterSpacing: '.04em' }}>TODAY'S RUN</span>
            <span className="pt-mono" style={{ fontSize: 12 }}>{dayLoading ? '…' : `${dayDone}/${dayTotal} stages`}</span>
          </div>
          <div style={{ display: 'flex', gap: 3, marginTop: 10 }}>
            {blocks.map(b => (
              <div key={b.id} style={{ flex: 1, height: 6, borderRadius: 2, background: completed.includes(b.id) ? '#34D399' : '#212938', transition: 'background .15s' }} />
            ))}
          </div>
        </div>

        {/* week allocation */}
        <div style={{ background: '#131926', border: '1px solid #212938', borderRadius: 10, padding: 14, marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="pt-mono" style={{ fontSize: 11, color: '#7C8797', letterSpacing: '.04em' }}>THIS WEEK · ALLOCATION</span>
            <span className="pt-mono" style={{ fontSize: 11, color: '#7C8797' }}>target 60/40</span>
          </div>
          {statsLoading ? (
            <div style={{ fontSize: 12, color: '#4B5563', marginTop: 10 }}>loading…</div>
          ) : focusTotal > 0 ? (
            <>
              <div style={{ position: 'relative', marginTop: 12 }}>
                <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', background: '#171E2B' }}>
                  <div style={{ width: `${devopsPct}%`, background: '#38BDF8', transition: 'width .2s' }} />
                  <div style={{ width: `${100 - devopsPct}%`, background: '#A78BFA', transition: 'width .2s' }} />
                </div>
                <div style={{ position: 'absolute', left: '60%', top: -3, bottom: -3, width: 2, background: '#E7EAF0', opacity: 0.5 }} />
              </div>
              <div className="pt-mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginTop: 7 }}>
                <span style={{ color: '#38BDF8' }}>DevOps {devopsPct}% · {(weekStats.devops / 60).toFixed(1)}h</span>
                <span style={{ color: '#A78BFA' }}>DSA+Dev {100 - devopsPct}% · {((weekStats.dsa + weekStats.dev) / 60).toFixed(1)}h</span>
              </div>
              <div className="pt-mono" style={{ display: 'flex', gap: 16, fontSize: 10.5, color: '#7C8797', marginTop: 9 }}>
                <span>ML {(weekStats.ml / 60).toFixed(1)}h</span>
                <span>Studies {(weekStats.studies / 60).toFixed(1)}h</span>
              </div>
            </>
          ) : (
            <div style={{ fontSize: 12, color: '#4B5563', marginTop: 10 }}>Check off stages to see your split build up.</div>
          )}
        </div>

        {/* stage list */}
        <div style={{ marginTop: 24 }}>
          {dayLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[0, 1, 2, 3].map(i => <div key={i} style={{ height: 44, background: '#131926', borderRadius: 8, opacity: 0.6 }} />)}
            </div>
          ) : blocks.map((block, i) => {
            const cat = CATS[block.type];
            const isDone = completed.includes(block.id);
            const isCurrent = isToday && isCurrentBlock(block, now);
            const isLast = i === blocks.length - 1;
            const markerColor = cat.focus ? cat.hue : '#4B5563';
            return (
              <button key={block.id} className="pt-btn" onClick={() => toggleBlock(block)} style={{ width: '100%', display: 'flex', gap: 12, textAlign: 'left' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 18 }}>
                  <span style={{
                    width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `2px solid ${isDone ? markerColor : (isCurrent ? markerColor : '#2B3446')}`,
                    background: isDone ? markerColor : 'transparent',
                    boxShadow: isCurrent && !isDone ? `0 0 0 3px ${hexToRgba(markerColor, 0.25)}` : 'none',
                  }}>
                    {isDone && <Check size={11} strokeWidth={3.5} color="#0B0E14" />}
                  </span>
                  {!isLast && <span style={{ flex: 1, width: 1, minHeight: 18, background: '#212938', marginTop: 3 }} />}
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, paddingBottom: 16 }}>
                  <div>
                    <div className="pt-mono" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                      <span style={{ color: '#7C8797' }}>{formatRange(block.start, block.end)}</span>
                      {isCurrent && <span className="pt-live-dot" style={{ color: markerColor }}>● LIVE</span>}
                    </div>
                    <div style={{ fontSize: 14, marginTop: 3, color: isDone ? '#4B5563' : '#E7EAF0', textDecoration: isDone ? 'line-through' : 'none' }}>
                      {block.label}
                    </div>
                  </div>
                  <span className="pt-mono" style={{
                    fontSize: 10, letterSpacing: '.04em', padding: '3px 7px', borderRadius: 4, flexShrink: 0,
                    color: cat.focus ? cat.hue : '#7C8797', background: cat.focus ? hexToRgba(cat.hue, 0.12) : 'rgba(124,135,151,0.08)',
                  }}>
                    {cat.label.toUpperCase()}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* legend */}
        <button className="pt-btn pt-mono" onClick={() => setShowLegend(s => !s)} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, color: '#7C8797' }}>
          <span style={{ display: 'inline-block', transform: showLegend ? 'rotate(90deg)' : 'none', transition: 'transform .15s' }}>▸</span>
          what-to-focus-on.md
        </button>
        {showLegend && (
          <div style={{ background: '#131926', border: '1px solid #212938', borderRadius: 10, padding: 14, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 9 }}>
            {LEGEND.map(item => (
              <div key={item.label} style={{ fontSize: 12.5, lineHeight: 1.55 }}>
                <span className="pt-mono" style={{ color: item.hue, fontWeight: 600 }}>{item.label}</span>
                <span style={{ color: '#9AA4B2' }}> — {item.text}</span>
              </div>
            ))}
          </div>
        )}

        <div className="pt-mono" style={{ fontSize: 10.5, color: '#4B5563', marginTop: 22, lineHeight: 1.7 }}>
          commute, wake-up, and wind-down times are placeholders — nudge them to match your actual routine, the checklist works the same either way.
        </div>
      </div>
    </div>
  );
}