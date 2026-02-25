import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);
    const error = useAuthStore((state) => state.error);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-xl font-semibold">Log in to your account</h1>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Enter your email and password below to log in</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Email address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm bg-transparent"
                        required
                        autoFocus
                    />
                </div>

                <div className="flex flex-col gap-1 relative">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Password</label>
                        <Link to="/forgot-password" className="text-sm text-zinc-600 dark:text-zinc-400 hover:underline">
                            Forgot your password?
                        </Link>
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm bg-transparent"
                        required
                    />
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-2 rounded-lg text-sm font-medium hover:opacity-90"
                >
                    {loading ? 'Connexion...' : 'Log in'}
                </button>
            </form>

            <div className="space-x-1 text-center text-sm text-zinc-600 dark:text-zinc-400">
                <span>Don't have an account?</span>
                <Link to="/register" className="underline hover:text-zinc-900 dark:hover:text-white">
                    Sign up
                </Link>
            </div>
        </div>
    );
}
