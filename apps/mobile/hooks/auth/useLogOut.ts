import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';

import agent from '@/lib/agent';
import { useAuthStore } from '@/store/auth/auth-session';
import QueryKeys from '@/constants/query-keys';

export const useLogout = () => {
  const { clearUserAndSession } = useAuthStore();
  const queryClient = useQueryClient();

  const { mutate: logOut, isPending: isLoggingOut } = useMutation({
    mutationFn: async () => {
      // Treat "already logged out" as OK
      try {
        await agent.post('/api/auth/sign-out');
      } catch (e: any) {
        if (e?.status !== 401 && e?.status !== 404) throw e;
      }
    },
    onSettled: () => {
      queryClient.removeQueries({ queryKey: QueryKeys.users.all });
      clearUserAndSession();
      router.replace('/(tabs)');
    },
  });

  return { logOut, isLoggingOut };
};
