import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { supabase } from '@/lib/supabase';
import { fireToast } from '@/providers/toaster';
import { TUser } from '@/types/user';

interface AuthState {
  user: TUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: TUser | null) => void;
  loadSession: () => Promise<void>;
  logOut: () => void;
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
              setTimeout(() => useAuthStore.getState().logOut(), 1000); // Log out after showing the error
              return;
            }

            set({
              accessToken: data.session.access_token,
              refreshToken: data.session.refresh_token,
            });

            // Ensure Supabase auto-refresh is running
            supabase.auth.startAutoRefresh();
          } else {
            setTimeout(() => useAuthStore.getState().logOut(), 1000);
            return;
          }
        } catch (err) {
          fireToast.info(err.message || 'Failed to load session.');
          setTimeout(() => useAuthStore.getState().logOut(), 1000);
        }
      },

      logOut: async () => {
        try {
          await SecureStore.deleteItemAsync('access_token');
          await SecureStore.deleteItemAsync('refresh_token');
          await supabase.auth.signOut();
          set({ accessToken: null, refreshToken: null, user: null });
        } catch (err) {
          fireToast.error(err.message || 'Failed to log out.');
        }
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
