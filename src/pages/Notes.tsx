import { useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import styles from './Page.module.css';

export default function Notes() {
  const [notes, setNotes] = useLocalStorage(
    'notes-list',
    [
      { id: 'n1', title: 'Weekly status', category: 'Work', content: 'Review progress and update roadmap.' },
      { id: 'n2', title: 'Learning path', category: 'Learning', content: 'Practice Docker and Kubernetes exercises.' },
    ],
  );
  const [search, setSearch] = useState('');
  const [activeNote, setActiveNote] = useState(notes[0]?.id ?? '');

  const filteredNotes = useMemo(
    () => notes.filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase()),
    ),
    [notes, search],
  );

  const active = notes.find((note) => note.id === activeNote) || filteredNotes[0];

  const updateNote = (value: string) => {
    if (!active) return;
    setNotes((current) =>
      current.map((note) =>
        note.id === active.id ? { ...note, content: value } : note,
      ),
    );
  };

  const deleteActive = () => {
    setNotes((current) => current.filter((note) => note.id !== active?.id));
    setActiveNote(filteredNotes[0]?.id ?? '');
  };

  return (
    <section className={styles.pageSection}>
      <div className={styles.notesHeader}>
        <div>
          <p className={styles.statusLabel}>Notes</p>
          <h2 className={styles.statusTitle}>Rich note editor</h2>
        </div>
        <input
          className={styles.searchInput}
          type="search"
          value={search}
          placeholder="Search notes"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className={styles.notesGrid}>
        <aside className={styles.notesList}>
          {filteredNotes.map((note) => (
            <button
              key={note.id}
              type="button"
              className={`${styles.noteListItem} ${note.id === active?.id ? styles.noteActive : ''}`}
              onClick={() => setActiveNote(note.id)}
            >
              <div>
                <strong>{note.title}</strong>
                <p>{note.category}</p>
              </div>
            </button>
          ))}
        </aside>

        <article className={styles.noteEditor}>
          {active ? (
            <>
              <div className={styles.noteMeta}>
                <span>{active.category}</span>
                <button type="button" className={styles.deleteButton} onClick={deleteActive}>Delete</button>
              </div>
              <textarea
                className={styles.noteTextarea}
                value={active.content}
                onChange={(event) => updateNote(event.target.value)}
                rows={10}
              />
            </>
          ) : (
            <div className={styles.emptyState}>
              <p>No note selected.</p>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
