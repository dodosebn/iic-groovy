import { create } from 'zustand';

interface ScrollStore {
  hasScrolled: boolean;
  setHasScrolled: (value: boolean) => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
  hasScrolled: false,
  setHasScrolled: (value) => set({ hasScrolled: value }),
}));
