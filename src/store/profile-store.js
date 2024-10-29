import { create } from "zustand";
import { persist } from "zustand/middleware";

const profileStore = create(persist(
  (set) => ({
    token: null,
    user: null,
    addProfileStore: (tokenData, userData) => set({ token: tokenData, user: userData }),
    updateUserData: (newUserData) => set((state) => ({
      user: {
        ...state.user,
        ...newUserData,
      }
    })),
    clearProfileStore: () => set({ token: null, user: null }), // Nuevo método para limpiar el store
  }),
  {
    name: "auth-storage",
    getStorage: () => localStorage,
  }
));

export default profileStore;
