import { create } from 'zustand';
import { getNotes, createNote, deleteNote } from '../services/noteService';

const useNoteStore = create((set) => ({
    notes: [],
    loading: false,
    error: null,

    fetchNotes: async () => {
        set({ loading: true, error: null });
        try {
            const response = await getNotes();
            set({ notes: response.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    addNote: async (text, tagId) => {
        const response = await createNote(text, tagId);
        set((state) => ({ notes: [response.data, ...state.notes] }));
    },

    removeNote: async (id) => {
        await deleteNote(id);
        set((state) => ({ notes: state.notes.filter((n) => n.id !== id) }));
    },
}));

export default useNoteStore;
