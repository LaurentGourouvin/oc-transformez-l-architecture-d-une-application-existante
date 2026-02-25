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

    if (loading) return <p className="text-sm text-zinc-500">Chargement...</p>;
    if (error) return <p className="text-sm text-red-500">Erreur : {error}</p>;

    return (
        <div className="space-y-2">
            <h2 className="text-xl font-bold">Your Notes</h2>
            {notes.length === 0 && <p className="text-sm text-zinc-500">Aucune note.</p>}
            {notes.map((note) => (
                <div key={note.id} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 flex justify-between items-start">
                    <div>
                        <p className="text-sm">{note.text}</p>
                        <small className="text-zinc-500">Tag: {note.tag?.name ?? '—'}</small>
                    </div>
                    <button
                        onClick={() => removeNote(note.id)}
                        className="text-red-500 text-sm hover:text-red-600"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}
