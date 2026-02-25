import React from 'react';
import AppLayout from './layouts/AppLayout';
import NoteList from './notes/NoteList';
import NoteForm from './notes/NoteForm';
import TagForm from './tags/TagForm';

export default function Dashboard() {
    return (
        <AppLayout>
            <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-xl">
                <div className="mt-6 p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900">
                    <NoteForm />
                    <hr className="my-4 border-neutral-200 dark:border-neutral-700" />
                    <NoteList />
                </div>

                <div className="mt-6 p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900">
                    <TagForm />
                </div>
            </div>
        </AppLayout>
    );
}
