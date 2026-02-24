import { create } from 'zustand';
import { login, logout } from '../services/authService';

const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const response = await login(email, password);
            localStorage.setItem('token', response.data.token);
            set({ user: response.data.user, token: response.data.token, loading: false });
            window.location.href = '/app/dashboard';
        } catch (error) {
            set({ error: 'Invalid credentials', loading: false });
        }
    },

    logout: async () => {
        try {
            await logout();
        } finally {
            localStorage.removeItem('token');
            set({ user: null, token: null });
            window.location.href = '/app/login';
        }
    },
}));

export default useAuthStore;
