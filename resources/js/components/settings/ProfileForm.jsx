import React, { useState, useEffect } from 'react';
import useProfileStore from '../../store/profileStore';

export default function ProfileForm() {
    const profile = useProfileStore((state) => state.profile);
    const fetchProfile = useProfileStore((state) => state.fetchProfile);
    const saveProfile = useProfileStore((state) => state.saveProfile);
    const removeProfile = useProfileStore((state) => state.removeProfile);
    const loading = useProfileStore((state) => state.loading);
    const success = useProfileStore((state) => state.success);
    const error = useProfileStore((state) => state.error);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        if (profile) {
            setName(profile.name);
            setEmail(profile.email);
        }
    }, [profile]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await saveProfile(name, email);
    };

    return (
        <section className="w-full">
            <div className="mb-6">
                <h2 className="text-lg font-semibold">Profile</h2>
                <p className="text-sm text-zinc-500">Update your name and email address</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 mb-8">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm bg-transparent"
                        required
                        autoFocus
                    />
                </div>
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

            <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6">
                <h3 className="text-lg font-semibold">Delete account</h3>
                <p className="text-sm text-zinc-500 mb-4">Delete your account and all of its resources</p>
                <button
                    onClick={removeProfile}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                >
                    Delete account
                </button>
            </div>
        </section>
    );
}
