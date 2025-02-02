import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';

import { userKeys, usersListKey } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { supabase } from '@/lib/supabase';
import { fireToast } from '@/providers/toaster';
import { ErrorData } from '@/types/api';

interface IUserDelete {
  id: string;
  supabaseId: string;
}

const deleteUser = async (params: IUserDelete) => {
  // Step 1: Delete user from your API
  const response = await agent('/user', {
    method: 'DELETE',
    body: JSON.stringify({
      id: params.id,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete user from API');
  }

  // Step 2: Delete user from Supabase Admin
  const { error } = await supabase.auth.admin.deleteUser(params.supabaseId);

  if (error) {
    throw new Error(`Failed to delete user from Supabase: ${error.message}`);
  }

  // Step 3: Sign out & clear tokens
  await supabase.auth.signOut();
  await SecureStore.deleteItemAsync('access_token');
  await SecureStore.deleteItemAsync('refresh_token');

  return response;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [userKeys, usersListKey],
      });
      fireToast.success(data.message);
    },
    onError: (error: ErrorData) => {
      fireToast.error(error.message);
    },
  });
};
