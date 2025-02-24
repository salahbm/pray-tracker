import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import useMutation from '../common/useMutation';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth/auth-session';
import { ApiError } from '@/utils/error';
import { createResponse, MessageCodes, StatusCode } from '@/utils/status';

// Function to handle the actual logout process
const logOut = async () => {
  try {
    // Ensure Supabase logs out first
    const { error } = await supabase.auth.signOut();

    if (error)
      throw new ApiError({
        message: error?.message || 'Failed to log out',
        status: error.status,
        code: MessageCodes.SIGN_OUT_FAILED,
      });

    // Remove stored authentication tokens
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');

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
};

// Custom hook for handling logout using useMutation
export const useLogout = () => {
  const { setUser, setSession } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logOut(),
    options: {
      onSuccess() {
        // Reset Zustand store
        setUser(null);
        setSession(null);

        // Clear React Query cache
        queryClient.clear();
        queryClient.resetQueries();

        router.push('/(tabs)');
      },
    },
  });
};
