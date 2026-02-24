import React, { useState, useEffect } from 'react';
import useNoteStore from '../../store/noteStore';
import useTagStore from '../../store/tagStore';

export default function NoteForm() {
    const [text, setText] = useState('');
    const [tagId, setTagId] = useState('');
    const addNote = useNoteStore((state) => state.addNote);
    const tags = useTagStore((state) => state.tags);
    const fetchTags = useTagStore((state) => state.fetchTags);

    useEffect(() => {
        fetchTags();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addNote(text, tagId);
        setText('');
        setTagId('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Nouvelle note..."
                required
            />
            <select
                value={tagId}
                onChange={(e) => setTagId(e.target.value)}
                required
            >
                <option value="">Sélectionner un tag</option>
                {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                        {tag.name}
                    </option>
                ))}
            </select>
            <button type="submit">Ajouter</button>
        </form>
    );
}
