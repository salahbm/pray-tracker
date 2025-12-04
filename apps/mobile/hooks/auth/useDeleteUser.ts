import { useMutation, useQueryClient } from '@tanstack/react-query';
import agent from '@/lib/agent';
import { useAuthStore } from '@/store/auth/auth-session';
import { router } from 'expo-router';

const deleteUser = async (id: string) => await agent.delete(`/users/${id}`);

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { clearUserAndSession } = useAuthStore();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess:  () => {
      clearUserAndSession();
      // 3) Cancel all queries immediately
      queryClient.cancelQueries();

      // 4) Clear ALL cached data
      queryClient.clear();

      router.replace('/(tabs)');
    },
  });
};
