import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { supabase } from '@/lib/supabase';
import { TUser } from '@/types/user';
import { ApiError } from '@/utils/error';
import { MessageCodes, StatusCode } from '@/utils/status';

interface AuthState {
  user: TUser | null;
  session: Session | null;
  setUser: (user: TUser | null) => void;
  setSession: (session: Session | null) => void;
  logOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      logOut: async () => {
        try {
          await SecureStore.deleteItemAsync('access_token');
          await SecureStore.deleteItemAsync('refresh_token');
          await supabase.auth.signOut();
          set({ user: null, session: null });
        } catch (err) {
          throw new ApiError({
            message: err ?? 'Failed to log out',
            status: StatusCode.INTERNAL_ERROR,
            code: MessageCodes.INTERNAL_ERROR,
          });
        }
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
