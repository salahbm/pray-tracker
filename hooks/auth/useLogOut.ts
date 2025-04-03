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
        // Prevent refetch by setting global default before anything else
        queryClient.setQueryDefaults(['*'], {
          enabled: false,
          staleTime: Infinity,
        });

        await queryClient.cancelQueries(); // then cancel all
        queryClient.removeQueries();
        queryClient.clear();

        // Reset Zustand store
        clearUserAndSession();

        // Sign out from Supabase
        const { error } = await supabase.auth.signOut();
        if (error && error?.message !== 'Auth session missing!') {
          throw new ApiError({
            message: error?.message || 'Failed to log out',
            status: error.status,
            code: MessageCodes.SIGN_OUT_FAILED,
          });
        }

        // Navigate after everything is cleared
        router.replace('/(tabs)');

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
  });
};
