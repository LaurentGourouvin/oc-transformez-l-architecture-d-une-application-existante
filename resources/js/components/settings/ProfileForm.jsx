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
        <div>
            <h2 className="text-lg font-semibold">Profile</h2>
            <p className="text-sm text-zinc-500 mb-4">Update your name and email address</p>

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 bg-zinc-800 border-zinc-700"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

            <div className="border-t border-zinc-700 pt-6">
                <h3 className="text-lg font-semibold">Delete account</h3>
                <p className="text-sm text-zinc-500 mb-4">Delete your account and all of its resources</p>
                <button
                    onClick={removeProfile}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
                >
                    Delete account
                </button>
            </div>
        </div>
    );
}
