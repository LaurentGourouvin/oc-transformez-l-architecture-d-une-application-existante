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
        <form onSubmit={handleSubmit} className="space-y-2">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your note..."
                className="w-full border border-neutral-200 dark:border-neutral-700 rounded-lg p-2 bg-transparent text-sm resize-none"
                rows={3}
                required
            />
            <select
                value={tagId}
                onChange={(e) => setTagId(e.target.value)}
                className="w-full border border-neutral-200 dark:border-neutral-700 rounded-lg p-2 bg-transparent text-sm"
                required
            >
                <option value="">-- Select Tag --</option>
                {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>{tag.name}</option>
                ))}
            </select>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
            >
                Add Note
            </button>
        </form>
    );
}
