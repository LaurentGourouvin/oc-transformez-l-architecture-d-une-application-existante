import React from 'react';
import NoteList from './notes/NoteList';
import NoteForm from './notes/NoteForm';

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <NoteForm />
            <NoteList />
        </div>
    );
}
