import React, { useState } from 'react';
import useProfileStore from '../../store/profileStore';

export default function PasswordForm() {
    const changePassword = useProfileStore((state) => state.changePassword);
    const loading = useProfileStore((state) => state.loading);
    const success = useProfileStore((state) => state.success);
    const error = useProfileStore((state) => state.error);

    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await changePassword(currentPassword, password, passwordConfirmation);
        setCurrentPassword('');
        setPassword('');
        setPasswordConfirmation('');
    };

    return (
        <section className="w-full">
            <div className="mb-6">
                <h2 className="text-lg font-semibold">Update password</h2>
                <p className="text-sm text-zinc-500">Ensure your account is using a long, random password to stay secure</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Current password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm bg-transparent"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">New password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm bg-transparent"
                        required
                    />
                </div>
                {success && <p className="text-green-500 text-sm">{success}</p>}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg text-sm font-medium hover:opacity-90"
                    >
                        Save
                    </button>
                </div>
            </form>
        </section>
    );
}
