import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';

import useMutation from '../common/useMutation';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth/auth-session';
import { ApiError } from '@/utils/error';
import { createResponse, MessageCodes, StatusCode } from '@/utils/status';

// Custom hook for handling logout using useMutation
export const useLogout = () => {
  const { clearUserAndSession } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        // Ensure Supabase logs out first
        const { error } = await supabase.auth.signOut();

        if (error)
          throw new ApiError({
            message: error?.message || 'Failed to log out',
            status: error.status,
            code: MessageCodes.SIGN_OUT_FAILED,
          });

        // Reset Zustand store
        clearUserAndSession();

        // Clear React Query cache
        queryClient.clear();
        queryClient.resetQueries();

        router.push('/(tabs)');

        return createResponse({
          status: StatusCode.SUCCESS,
          message: 'Logout successful',
          code: MessageCodes.SIGN_OUT_SUCCESSFULLY,
          data: null,
        });
      } catch (err) {
        throw new ApiError({
          message: err?.message || 'Failed to log out',
          status: StatusCode.INTERNAL_ERROR,
          code: MessageCodes.SIGN_OUT_FAILED,
        });
      }
    },
    options: {
      onSuccess() {},
    },
  });
};
