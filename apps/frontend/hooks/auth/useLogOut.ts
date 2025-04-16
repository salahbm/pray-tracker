import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/auth/auth-session';
import useMutation from '../common/useMutation';

const logoutFn = async () => {
  // Simulate async behavior (optional)
  await new Promise((resolve) => setTimeout(resolve, 25));

  return { success: true };
};

export const useLogout = () => {
  const { clearUserAndSession } = useAuthStore();
  const queryClient = useQueryClient();

  const { mutate: logOut, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutFn,
    options: {
      onMutate: () => {
        queryClient.clear();
      },
      onSuccess: () => {
        clearUserAndSession();
        router.replace('/(tabs)');
      },
    },
  });

  return { logOut, isLoggingOut };
};
