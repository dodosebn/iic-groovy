import { AuthState } from '@/types/type';
import { create } from 'zustand';
// import { supabase } from './supabaseClient';

// Auth Store
export const useAuthStore = create<AuthState>((set) => ({
  email: '',
  password: '',
  handleEmailChange: (e: { target: { value: any; }; }) => set({ email: e.target.value }),
  handlePasswordChange: (e: { target: { value: any; }; }) => set({ password: e.target.value }),
}));

