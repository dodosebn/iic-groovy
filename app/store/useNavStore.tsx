import { create } from 'zustand';

interface NavbarState {
  isMobile: boolean;
  menuOpen: boolean;
  moreOpen: boolean;
  setIsMobile: (value: boolean) => void;
  setMenuOpen: (value: boolean) => void;
  setMoreOpen: (value: boolean) => void;
}

export const useNavbarStore = create<NavbarState>((set) => ({
  isMobile: false,
  menuOpen: false,
  moreOpen: false,
  setIsMobile: (value) => set({ isMobile: value }),
  setMenuOpen: (value) => set({ menuOpen: value }),
  setMoreOpen: (value) => set({ moreOpen: value }),
}));
