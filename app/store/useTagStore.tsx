// store/useTagStore.ts
import { create } from 'zustand';

interface TagStore {
  selectedTag: string | null;
  setTag: (tag: string | null) => void;
}

export const useTagStore = create<TagStore>((set) => ({
  selectedTag: null,
  setTag: (tag) => {
    console.log('setTag called with:', tag);
    set({ selectedTag: tag });
  },
}));
