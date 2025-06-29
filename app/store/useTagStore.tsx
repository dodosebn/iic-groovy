import { create } from 'zustand';

interface TagStore {
  selectedTag: string | null;
  clicked: boolean;
  setTag: (tag: string | null) => void;
  resetTag: () => void;
}

export const useTagStore = create<TagStore>((set) => ({
  selectedTag: null,
  clicked: false,
  setTag: (tag) => {
    console.log('setTag called with:', tag);
    set({ selectedTag: tag, clicked: tag !== null });
  },
  resetTag: () => {
    console.log('resetTag called');
    set({ selectedTag: null, clicked: false });
  },
}));
