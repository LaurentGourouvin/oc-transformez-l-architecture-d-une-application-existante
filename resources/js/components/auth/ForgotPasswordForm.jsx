import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import usePasswordStore from '../../store/passwordStore';

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const sendResetLink = usePasswordStore((state) => state.sendResetLink);
    const loading = usePasswordStore((state) => state.loading);
    const success = usePasswordStore((state) => state.success);
    const error = usePasswordStore((state) => state.error);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendResetLink(email);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-xl font-semibold">Forgot password</h1>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Enter your email to receive a password reset link</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Email Address</label>
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

                {success && <p className="text-green-500 text-sm text-center">{success}</p>}
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-2 rounded-lg text-sm font-medium hover:opacity-90"
                >
                    {loading ? 'Envoi...' : 'Email password reset link'}
                </button>
            </form>

            <div className="space-x-1 text-center text-sm text-zinc-400">
                <span>Or, return to</span>
                <Link to="/login" className="underline hover:text-white">log in</Link>
            </div>
        </div>
    );
}
