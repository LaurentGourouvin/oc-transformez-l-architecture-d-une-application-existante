import React, { useEffect } from 'react';
import useNoteStore from '../../store/noteStore';

export default function NoteList() {
    const { notes, loading, error, fetchNotes, removeNote } = useNoteStore();

    useEffect(() => {
        fetchNotes();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Mes notes</h2>
            {notes.length === 0 && <p>Aucune note.</p>}
            <ul>
                {notes.map((note) => (
                    <li key={note.id} className="flex justify-between items-center mb-2">
                        <span>{note.text}</span>
                        <button
                            onClick={() => removeNote(note.id)}
                            className="text-red-500 text-sm"
                        >
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
