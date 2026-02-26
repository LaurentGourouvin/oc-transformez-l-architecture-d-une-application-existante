import api from '../libs/axios';

export const forgotPassword = async (email) => {
    const response = await api.post('/password/forgot-password', { email });
    return response.data;
};

export const resetPassword = async (token, email, password, password_confirmation) => {
    const response = await api.post('/password/reset', { token, email, password, password_confirmation });
    return response.data;
};
