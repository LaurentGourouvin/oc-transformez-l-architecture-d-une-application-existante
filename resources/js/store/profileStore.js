import { create } from 'zustand';
import { getProfile, updateProfile, deleteProfile, updatePassword } from '../services/profileService';

const useProfileStore = create((set) => ({
    profile: null,
    loading: false,
    error: null,
    success: null,

    fetchProfile: async () => {
        set({ loading: true, error: null });
        try {
            const response = await getProfile();
            set({ profile: response.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    saveProfile: async (name, email) => {
        set({ loading: true, error: null, success: null });
        try {
            const response = await updateProfile(name, email);
            set({ profile: response.data, loading: false, success: 'Profile updated' });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    changePassword: async (current_password, password, password_confirmation) => {
        set({ loading: true, error: null, success: null });
        try {
            await updatePassword(current_password, password, password_confirmation);
            set({ loading: false, success: 'Password updated' });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    removeProfile: async () => {
        await deleteProfile();
        localStorage.removeItem('token');
        window.location.href = '/app/login';
    },
}));

export default useProfileStore;
