// src/store/useNotes.js
import { create } from 'zustand';


const useNotes = create((set) => ({
    notes: [],

    setNotes: (notes) => set({ notes }),
  
    addNote: (note) =>
      set((state) => ({
        notes: [note, ...state.notes],
      })),
  
    removeNote: (id) =>
      set((state) => ({
        notes: state.notes.filter((n) => n._id !== id),
      })),
  
    updateNote: (updatedNote) =>
      set((state) => ({
        notes: state.notes.map((n) => (n._id === updatedNote._id ? updatedNote : n)),
      })),

}));

export default useNotes;