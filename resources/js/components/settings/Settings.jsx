import React, { useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import ProfileForm from './ProfileForm';
import PasswordForm from './PasswordForm';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <AppLayout>
            <h1 className="text-xl font-semibold mb-1">Settings</h1>
            <p className="text-sm text-zinc-500 mb-6">Manage your profile and account settings</p>

            <div className="border-t border-zinc-700 pt-6 flex gap-8">
                <nav className="w-48 flex flex-col gap-1">
                    {['profile', 'password'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-left px-3 py-2 rounded-lg text-sm capitalize ${
                                activeTab === tab
                                    ? 'bg-zinc-700 font-medium'
                                    : 'hover:bg-zinc-800'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                <div className="flex-1">
                    {activeTab === 'profile' && <ProfileForm />}
                    {activeTab === 'password' && <PasswordForm />}
                </div>
            </div>
        </AppLayout>
    );
}
