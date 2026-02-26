import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import api from '../../libs/axios';

export default function VerifyEmailCallback() {
    const { id, hash } = useParams();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        const verify = async () => {
            try {
                await api.get(`/email/verify/${id}/${hash}?${searchParams.toString()}`);
                setStatus('success');
                setTimeout(() => {
                    window.location.href = '/app/dashboard';
                }, 2000);
            } catch (error) {
                setStatus('error');
            }
        };
        verify();
    }, []);

    return (
        <div className="flex flex-col gap-4 text-center">
            {status === 'loading' && <p className="text-sm text-zinc-500">Vérification en cours...</p>}
            {status === 'success' && <p className="text-sm text-green-500">Email vérifié ! Redirection...</p>}
            {status === 'error' && <p className="text-sm text-red-500">Lien invalide ou expiré.</p>}
        </div>
    );
}
