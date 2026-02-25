import React from 'react';
import AppLayout from './layouts/AppLayout';
import NoteList from './notes/NoteList';
import NoteForm from './notes/NoteForm';
import TagForm from './tags/TagForm';

export default function Dashboard() {
    return (
        <AppLayout>
            <h1 className="text-xl font-semibold mb-6">Dashboard</h1>
            <NoteForm />
            <NoteList />
            <TagForm />
        </AppLayout>
    );
}
