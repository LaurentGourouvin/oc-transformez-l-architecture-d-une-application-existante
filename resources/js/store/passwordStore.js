import { create } from 'zustand';
import { forgotPassword, resetPassword } from '../services/passwordService';

const usePasswordStore = create((set) => ({
    loading: false,
    error: null,
    success: null,

    sendResetLink: async (email) => {
        set({ loading: true, error: null, success: null });
        try {
            const response = await forgotPassword(email);
            set({ loading: false, success: response.message });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    resetPassword: async (token, email, password, password_confirmation) => {
        set({ loading: true, error: null, success: null });
        try {
            const response = await resetPassword(token, email, password, password_confirmation);
            set({ loading: false, success: response.message });
            window.location.href = '/app/login';
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));

export default usePasswordStore;
