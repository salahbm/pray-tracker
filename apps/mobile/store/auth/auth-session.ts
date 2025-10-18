import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { TUser } from '@/types/user';

interface AuthState {
  user: TUser | null;
  session: { access_token: string; refresh_token: string } | null;
  setUser: (user: TUser | null) => void;
  setSession: (session: { access_token: string; refresh_token: string } | null) => void;
  clearUserAndSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      session: null,
      setUser: (user: TUser | null) => {
        if (!user) {
          set({ user: null });
          return;
        }
        // Omit password when storing user
        const { password: _, ...storedUser } = user;
        set({ user: { ...storedUser, password: '' } });
      },
      setSession: (session: { access_token: string; refresh_token: string } | null) =>
        set({ session }),
      clearUserAndSession: () => set({ user: null, session: null }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
