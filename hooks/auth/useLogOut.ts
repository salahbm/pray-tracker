import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth/auth-session';

const logOut = async () => {
  await SecureStore.deleteItemAsync('access_token');
  await SecureStore.deleteItemAsync('refresh_token');
  await supabase.auth.signOut();
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: logOut,
    onSuccess: async () => {
      setUser(null);
      queryClient.clear();
      router.push('/(tabs)');
    },
  });
};
