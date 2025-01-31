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
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      setUser: (user) => set({ user }),

      loadSession: async () => {
        const accessToken = await SecureStore.getItemAsync('access_token');
        const refreshToken = await SecureStore.getItemAsync('refresh_token');

        if (accessToken && refreshToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error || !data?.session) {
            return fireToast.error(error?.message || 'Something went wrong.');
          }

          set({
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
          });

          scheduleSessionRefresh();
        }
      },

      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, accessToken: null, refreshToken: null });
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

const scheduleSessionRefresh = () => {
  setInterval(
    async () => {
      const { data, error } = await supabase.auth.refreshSession();

      if (error) {
        useAuthStore.getState().logout();
        return fireToast.error(error.message);
      }

      if (data?.session) {
        const { access_token, refresh_token } = data.session;
        useAuthStore.setState({
          accessToken: access_token,
          refreshToken: refresh_token,
        });
        await SecureStore.setItemAsync('access_token', access_token);
        await SecureStore.setItemAsync('refresh_token', refresh_token);
      }
    },
    55 * 60 * 1000,
  );
};
