import React from 'react';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function HomePage() {
    const navigate = useNavigate();
    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        if (token && user) {
            navigate('/dashboard', { replace: true });
        }
    }, [token, user, navigate]);

    // Si connecté, on laisse le useEffect rediriger (pas de flash de contenu)
    if (token && user) {
        return null;
    }

    return (
        <div className="bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] flex p-6 lg:p-8 items-center lg:justify-center min-h-screen flex-col">
            {/* Header nav */}
            <header className="w-full lg:max-w-4xl max-w-[335px] text-sm mb-6">
                <nav className="flex items-center justify-end gap-4">
                    <Link
                        to="/login"
                        className="inline-block px-5 py-1.5 dark:text-[#EDEDEC] text-[#1b1b18] border border-transparent hover:border-[#19140035] dark:hover:border-[#3E3E3A] rounded-sm text-sm leading-normal"
                    >
                        Log in
                    </Link>
                    <Link
                        to="/register"
                        className="inline-block px-5 py-1.5 dark:text-[#EDEDEC] border-[#19140035] hover:border-[#1915014a] border text-[#1b1b18] dark:border-[#3E3E3A] dark:hover:border-[#62605b] rounded-sm text-sm leading-normal"
                    >
                        Register
                    </Link>
                </nav>
            </header>

            {/* Main content */}
            <div className="flex items-center justify-center w-full lg:grow">
                <main className="flex max-w-[335px] w-full flex-col-reverse lg:max-w-4xl lg:flex-row">
                    {/* Text block */}
                    <div className="text-[13px] leading-[20px] flex-1 p-6 pb-12 lg:p-20 bg-white dark:bg-[#161615] dark:text-[#EDEDEC] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d] rounded-es-lg rounded-ee-lg lg:rounded-ss-lg lg:rounded-ee-none">
                        <h1 className="mb-1 font-medium">Renote</h1>
                        <p className="mb-2 text-[#706f6c] dark:text-[#A1A09A]">
                            Renote is the best application to take notes.<br />
                            Create, save, delete your notes.<br />
                            Add tags to your notes.
                        </p>
                        <div className="mt-6 flex gap-3">
                            <Link
                                to="/login"
                                className="inline-block px-5 py-1.5 bg-[#1b1b18] dark:bg-white text-white dark:text-[#1b1b18] rounded-sm text-sm leading-normal font-medium hover:opacity-90 transition-opacity"
                            >
                                Get started
                            </Link>
                        </div>
                    </div>

                    {/* Logo block */}
                    <div className="bg-[#fff2f2] dark:bg-[#1D0002] relative lg:-ms-px -mb-px lg:mb-0 rounded-t-lg lg:rounded-t-none lg:rounded-e-lg aspect-[335/376] lg:aspect-auto w-full lg:w-[438px] shrink-0 overflow-hidden flex items-center justify-center">
                        <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="layerGradient" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#FFD700" />
                                    <stop offset="100%" stopColor="#FF69B4" />
                                </linearGradient>
                            </defs>
                            {/* Base shadow */}
                            <path
                                d="M78 258V58H158C208 58 238 88 238 128C238 158 218 183 188 193L243 258H198L153 203H118V258H78Z M118 88V173H158C183 173 198 158 198 128C198 98 183 88 158 88H118Z"
                                fill="black"
                                opacity="0.5"
                                transform="translate(8,8)"
                            />
                            {/* Main R with gradient */}
                            <path
                                d="M70 250V50H150C200 50 230 80 230 120C230 150 210 175 180 185L235 250H190L145 195H110V250H70Z M110 80V165H150C175 165 190 150 190 120C190 90 175 80 150 80H110Z"
                                fill="url(#layerGradient)"
                                stroke="#1B1B18"
                                strokeWidth="4"
                            />
                        </svg>
                        <div className="absolute inset-0 rounded-t-lg lg:rounded-t-none lg:rounded-e-lg shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]"></div>
                    </div>
                </main>
            </div>

            <div className="h-14 hidden lg:block" />
        </div>
    );
}
