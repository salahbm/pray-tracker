import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth/auth-session';

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      await supabase.auth.signOut();
      await SecureStore.deleteItemAsync('access_token');
      await SecureStore.deleteItemAsync('refresh_token');

      // ✅ Clear Zustand state
      setUser(null);

      //   refresh the session
      await supabase.auth.refreshSession();
    },
    onSuccess: async () => {
      queryClient.clear();
      router.push('/(tabs)');
    },
  });
};
