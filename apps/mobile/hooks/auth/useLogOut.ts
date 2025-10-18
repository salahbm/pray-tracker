import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';

import agent from '@/lib/agent';
import { useAuthStore } from '@/store/auth/auth-session';

const logoutFn = async () => {
  try {
    // Call backend sign-out endpoint
    await agent.post('/auth/signout');
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    // Still return success to clear local state
    return { success: true };
  }
};

export const useLogout = () => {
  const { clearUserAndSession } = useAuthStore();
  const queryClient = useQueryClient();

  const { mutate: logOut, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutFn,
    onMutate: () => {
      queryClient.clear();
    },
    onSuccess: () => {
      clearUserAndSession();
      router.replace('/(tabs)');
    },
  });

  return { logOut, isLoggingOut };
};
