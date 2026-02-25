import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

function getInitials(name) {
    if (!name) return '';
    return name.split(' ').slice(0, 2).map(w => w[0].toUpperCase()).join('');
}

export default function AppLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const location = useLocation();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const navItem = (to, label) => (
        <Link
            to={to}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm mb-1 ${
                location.pathname === to
                    ? 'bg-zinc-200 dark:bg-zinc-700 font-medium'
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
        >
            {label}
        </Link>
    );

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-800 flex">

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-[220px] flex flex-col
                border-r border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900
                transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:static
            `}>
                {/* Close button mobile */}
                <div className="flex items-center justify-between p-4 lg:hidden">
                    <button onClick={() => setSidebarOpen(false)} className="text-zinc-500">✕</button>
                </div>

                {/* Logo */}
                <div className="px-4 py-4">
                    <Link to="/dashboard" className="flex items-center gap-2">
                        <span className="font-semibold text-sm">Renote</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 px-3 mb-2 uppercase font-medium">Platform</p>
                    {navItem('/dashboard', 'Dashboard')}
                </nav>

                {/* Bottom links */}
                <div className="px-3 mb-2">
                <a
                    href="https://github.com/laravel/livewire-starter-kit"
                    target="_blank"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    Repository
                </a>
                <a
                href="https://laravel.com/docs/starter-kits#livewire"
                target="_blank"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    Documentation
                </a>
        </div>

    {/* User menu */}
    <div className="p-3 relative">
        <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-700 text-sm font-medium">
                            {getInitials(user?.name)}
                        </span>
            <div className="flex-1 text-start leading-tight">
                <p className="text-sm font-semibold truncate">{user?.name}</p>
                <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
            </div>
            <span className="text-zinc-400 text-xs">⌄</span>
        </button>

        {/* Dropdown */}
        {userMenuOpen && (
            <div className="absolute bottom-16 left-3 right-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg z-50">
                <Link
                    to="/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-t-lg"
                >
                    Settings
                </Link>
                <hr className="border-zinc-200 dark:border-zinc-700" />
                <button
                    onClick={logout}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-b-lg"
                >
                    Log Out
                </button>
            </div>
        )}
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
    <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">
            <button onClick={() => setSidebarOpen(true)} className="text-zinc-500">
                ☰
            </button>
            <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-700 text-sm font-medium"
            >
                {getInitials(user?.name)}
            </button>
        </header>

        <main className="flex-1 p-6">
            {children}
        </main>
    </div>
</div>
);
}
