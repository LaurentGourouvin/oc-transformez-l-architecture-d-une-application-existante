import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePasswordStore from '../../store/passwordStore';

export default function ResetPasswordForm() {
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState(searchParams.get('email') || '');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const token = searchParams.get('token') || '';

    const resetPassword = usePasswordStore((state) => state.resetPassword);
    const loading = usePasswordStore((state) => state.loading);
    const success = usePasswordStore((state) => state.success);
    const error = usePasswordStore((state) => state.error);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await resetPassword(token, email, password, passwordConfirmation);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-xl font-semibold">Reset password</h1>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Please enter your new password below</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm bg-transparent"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm bg-transparent"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Confirm password</label>
                    <input
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        placeholder="Confirm password"
                        className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm bg-transparent"
                        required
                    />
                </div>

                {success && <p className="text-green-500 text-sm text-center">{success}</p>}
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-2 rounded-lg text-sm font-medium hover:opacity-90"
                >
                    {loading ? 'Réinitialisation...' : 'Reset password'}
                </button>
            </form>
        </div>
    );
}
