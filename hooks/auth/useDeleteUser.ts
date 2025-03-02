import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useLogout } from './useLogOut';
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
  // Step 2: Delete user from Supabase Admin
  const { error } = await supabase.auth.admin.deleteUser(params.supabaseId);

  if ('code' in error && error?.code !== 'user_not_found') {
    throw new ApiError({
      message: error.message,
      status: StatusCode.INTERNAL_ERROR,
      code: MessageCodes.INTERNAL_ERROR,
    });
  }
  // Step 1: Delete user from your API
  const response = await agent('/user', {
    method: 'DELETE',
    body: JSON.stringify({ id: params.id }),
  });

  return response;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: logout } = useLogout();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await logout(undefined);
      await queryClient.invalidateQueries({
        queryKey: [userKeys, usersListKey],
      });
    },
  });
};
