import { create } from 'zustand';
import { getTags, createTag } from '../services/tagService';

const useTagStore = create((set) => ({
    tags: [],
    loading: false,
    error: null,

    fetchTags: async () => {
        set({ loading: true, error: null });
        try {
            const response = await getTags();
            set({ tags: response.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    addTag: async (name) => {
        const response = await createTag(name);
        set((state) => ({ tags: [...state.tags, response.data] }));
    },
}));

export default useTagStore;
