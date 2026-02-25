import React, { useState } from 'react';
import api from '../../libs/axios';

export default function ConfirmPassword() {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await api.post('/password/confirm', { password });
            window.location.href = '/app/dashboard';
        } catch (err) {
            setError('Wrong password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-xl font-semibold">Confirm password</h1>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    This is a secure area of the application. Please confirm your password before continuing.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm bg-transparent"
                        required
                        autoFocus
                    />
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-2 rounded-lg text-sm font-medium hover:opacity-90"
                >
                    {loading ? 'Confirmation...' : 'Confirm'}
                </button>
            </form>
        </div>
    );
}
