import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';

import { userKeys, usersListKey } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { supabase } from '@/lib/supabase';
import { ApiError } from '@/utils/error';
import { MessageCodes, StatusCode } from '@/utils/status';

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

  // Step 2: Sign out & clear tokens
  await supabase.auth.signOut();
  await SecureStore.deleteItemAsync('access_token');
  await SecureStore.deleteItemAsync('refresh_token');

  // Step 3: Delete user from Supabase Admin
  const { error } = await supabase.auth.admin.deleteUser(params.supabaseId);

  if (error) {
    throw new ApiError({
      message: error.message,
      status: StatusCode.INTERNAL_ERROR,
      code: MessageCodes.INTERNAL_ERROR,
    });
  }

  return response;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [userKeys, usersListKey],
      });
    },
  });
};
