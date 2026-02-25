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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nouveau tag..."
                required
            />
            <button type="submit">Ajouter</button>
        </form>
    );
}
