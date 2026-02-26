import api from '../libs/axios';

export const getNotes = async () => {
    const response = await api.get('/note');
    return response.data;
};

export const createNote = async (text, tagId) => {
    const response = await api.post('/note', { text, tag_id: tagId });
    return response.data;
};

export const deleteNote = async (id) => {
    const response = await api.delete(`/note/${id}`);
    return response.data;
};
