import React, { useState } from 'react';
import useAuthStore from '../../store/authStore';
import api from '../../libs/axios';

export default function VerifyEmail() {
    const logout = useAuthStore((state) => state.logout);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleResend = async () => {
        setLoading(true);
        try {
            await api.post('/email/verify/send');
            setSuccess('A new verification link has been sent to the email address you provided during registration.');
        } catch (error) {
            setSuccess(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4 flex flex-col gap-6">
            <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                Please verify your email address by clicking on the link we just emailed to you.
            </p>

            {success && (
                <p className="text-center text-sm font-medium text-green-600 dark:text-green-400">
                    {success}
                </p>
            )}

            <div className="flex flex-col items-center justify-between space-y-3">
                <button
                    onClick={handleResend}
                    disabled={loading}
                    className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-2 rounded-lg text-sm font-medium hover:opacity-90"
                >
                    {loading ? 'Envoi...' : 'Resend verification email'}
                </button>

                <button
                    onClick={logout}
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:underline cursor-pointer"
                >
                    Log out
                </button>
            </div>
        </div>
    );
}
