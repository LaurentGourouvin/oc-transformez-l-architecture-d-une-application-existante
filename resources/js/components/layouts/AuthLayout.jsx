import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-2">
                <Link to="/" className="flex flex-col items-center gap-2 font-medium mb-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-900 dark:bg-white">
                        <span className="text-white dark:text-zinc-900 font-bold text-lg">R</span>
                    </div>
                </Link>
                <div className="flex flex-col gap-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
