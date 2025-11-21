import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  session: {
    token: string;
    refreshToken?: string;
    expiresAt?: number;
  } | null;
  setUser: (user: User | null) => void;
  setSession: (session: AuthState['session']) => void;
  clearUserAndSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      session: null,
      setUser: (user: User | null) => {
        if (!user) {
          set({ user: null });
          return;
        }
        set({ user });
      },
      setSession: session => {
        if (!session) {
          set({ session: null });
          return;
        }

        set({ session });
      },
      clearUserAndSession: () => set({ user: null, session: null }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
