import api from '../libs/axios';

export const getTags = async () => {
    const response = await api.get('/tag');
    return response.data;
};

export const createTag = async (name) => {
    const response = await api.post('/tag', { name });
    return response.data;
};
