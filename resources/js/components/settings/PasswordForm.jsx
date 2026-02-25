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
        <div>
            <h2 className="text-lg font-semibold">Password</h2>
            <p className="text-sm text-zinc-500 mb-4">Update your password</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Current password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 bg-zinc-800 border-zinc-700"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">New password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 bg-zinc-800 border-zinc-700"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Confirm password</label>
                    <input
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 bg-zinc-800 border-zinc-700"
                        required
                    />
                </div>
                {success && <p className="text-green-500 text-sm">{success}</p>}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-white text-black rounded-lg text-sm"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
