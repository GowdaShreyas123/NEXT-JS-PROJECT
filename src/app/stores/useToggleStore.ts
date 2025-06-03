import { create } from 'zustand';

type ToggleStore = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (val: boolean) => void;
};

export const useToggleStore = create<ToggleStore>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setDarkMode: (val) => set({ isDarkMode: val }),
}));

