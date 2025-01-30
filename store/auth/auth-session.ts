import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { supabase } from '@/lib/supabase';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: User | null) => void;
  loadSession: () => Promise<void>;
}

supabase.auth.getSession();

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      setUser: (user) => set({ user }),

      loadSession: async () => {
        const accessToken = await SecureStore.getItemAsync('access_token');
        const refreshToken = await SecureStore.getItemAsync('refresh_token');

        if (accessToken && refreshToken) {
          const { data } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (data?.session) {
            const expiresIn = data.session.expires_in * 1000; // Convert to ms

            // Set tokens in store
            set({ accessToken, refreshToken });

            // Schedule user removal when session expires
            setTimeout(() => {
              set({ user: null, accessToken: null, refreshToken: null });
            }, expiresIn);
          }
        }
      },
    }),
    {
      name: 'auth-store', // Key for persistence
      storage: createJSONStorage(() => AsyncStorage), // Persist using AsyncStorage
    },
  ),
);
