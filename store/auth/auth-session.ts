import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { TUser, TStoredUser } from '@/types/user';

interface AuthState {
  user: TStoredUser | null; // Changed from TUser to TStoredUser
  session: Session | null;
  setUser: (user: TUser | null) => void;
  setSession: (session: Session | null) => void;
  clearUserAndSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      setUser: (user: TUser | null) => {
        if (!user) {
          set({ user: null });
          return;
        }
        // Omit password when storing user
        const { password, ...storedUser } = user;
        set({ user: storedUser });
      },
      setSession: (session: Session | null) => set({ session }),
      clearUserAndSession: () => set({ user: null, session: null }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
