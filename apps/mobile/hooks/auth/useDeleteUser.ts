import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userKeys, usersListKey } from '@/constants/query-keys';
import { agent } from '@/lib/agent';

import { useLogout } from '../auth/useLogOut';

interface IUserDelete {
  id: string;
  supabaseId: string;
}

const deleteUser = async (params: IUserDelete) => {
  // Step 1: Delete user from your API
  const response = await agent('/auth/delete', {
    method: 'DELETE',
    body: JSON.stringify({ id: params.id, supabaseId: params.supabaseId }),
  });

  return response;
};
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { logOut } = useLogout();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      logOut({ success: true });
      await queryClient.invalidateQueries({
        queryKey: [userKeys, usersListKey],
      });
    },
  });
};
