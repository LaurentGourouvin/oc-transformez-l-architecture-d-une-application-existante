import api from '../libs/axios';

export const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};

export const register = async (name, email, password, password_confirmation) => {
    const response = await api.post('/auth/register', { name, email, password, password_confirmation });
    return response.data;
};

export const logout = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
};
