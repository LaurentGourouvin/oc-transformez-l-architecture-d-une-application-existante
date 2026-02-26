import api from '../libs/axios';

export const getProfile = async () => {
    const response = await api.get('/profile/me');
    return response.data;
};

export const updateProfile = async (name, email) => {
    const response = await api.put('/profile', { name, email });
    return response.data;
};

export const deleteProfile = async () => {
    const response = await api.delete('/profile');
    return response.data;
};

export const updatePassword = async (current_password, password, password_confirmation) => {
    const response = await api.patch('/password/update', { current_password, password, password_confirmation });
    return response.data;
};
