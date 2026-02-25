import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

export default function AppLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-800 flex">
            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-[220px] flex flex-col
                border-r border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900
                transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:static lg:flex
            `}>
                {/* Logo */}
                <div className="p-4">
                    <Link to="/dashboard" className="flex items-center gap-2">
                        <span className="font-semibold text-lg">Renote</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <p className="text-xs text-zinc-500 mb-2 uppercase">Platform</p>
                    <Link
                        to="/dashboard"
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm mb-1 ${
                            location.pathname === '/dashboard'
                                ? 'bg-zinc-200 dark:bg-zinc-700 font-medium'
                                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        }`}
                    >
                        Dashboard
                    </Link>
                </nav>

                {/* User menu */}
                <div className="p-4 border-t border-zinc-200 dark:border-zinc-700">
                    {user && (
                        <div className="mb-3">
                            <p className="text-sm font-semibold truncate">{user.name}</p>
                            <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                        </div>
                    )}
                    <Link to="/settings" className={`...`}>
                        Settings
                    </Link>
                    <button
                        onClick={logout}
                        className="w-full text-left text-sm text-red-500 hover:text-red-600"
                    >
                        Se déconnecter
                    </button>
                </div>
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Mobile header */}
                <header className="lg:hidden flex items-center px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">
                    <button onClick={() => setSidebarOpen(true)} className="text-zinc-500">
                        ☰
                    </button>
                </header>

                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
