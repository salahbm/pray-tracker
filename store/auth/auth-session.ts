import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { supabase } from '@/lib/supabase';
import { fireToast } from '@/providers/toaster';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: User | null) => void;
  loadSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      setUser: (user) => set({ user }),

      loadSession: async () => {
        try {
          const accessToken = await SecureStore.getItemAsync('access_token');
          const refreshToken = await SecureStore.getItemAsync('refresh_token');

          if (accessToken && refreshToken) {
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (error || !data?.session) {
              fireToast.error(
                error?.message || 'Session expired, please log in again.',
              );
              return;
            }

            set({
              accessToken: data.session.access_token,
              refreshToken: data.session.refresh_token,
            });

            // Ensure Supabase auto-refresh is running
            supabase.auth.startAutoRefresh();
          }
        } catch (err) {
          fireToast.error(err.message || 'Failed to load session.');
        }
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
