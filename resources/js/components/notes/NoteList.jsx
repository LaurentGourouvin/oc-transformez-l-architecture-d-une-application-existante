import React, { useEffect } from 'react';
import useNoteStore from '../../store/noteStore';

export default function NoteList() {
    const notes = useNoteStore((state) => state.notes);
    const loading = useNoteStore((state) => state.loading);
    const error = useNoteStore((state) => state.error);
    const fetchNotes = useNoteStore((state) => state.fetchNotes);
    const removeNote = useNoteStore((state) => state.removeNote);

    useEffect(() => {
        fetchNotes();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div>
            <h2>Mes notes</h2>
            {notes.length === 0 && <p>Aucune note.</p>}
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <span>{note.text}</span>
                        <button onClick={() => removeNote(note.id)}>
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
