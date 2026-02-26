import React, { useState } from 'react';
import useTagStore from '../../store/tagStore';

export default function TagForm() {
    const [name, setName] = useState('');
    const addTag = useTagStore((state) => state.addTag);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addTag(name);
        setName('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nouveau tag..."
                className="w-full border border-neutral-200 dark:border-neutral-700 rounded-lg p-2 bg-transparent text-sm"
                required
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
            >
                Add Tag
            </button>
        </form>
    );
}
