import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userKeys, usersListKey } from '@/constants/query-keys';
import agent from '@/lib/agent';

import { useLogout } from '../auth/useLogOut';

interface IUserDelete {
  id: string;
}

const deleteUser = async (params: IUserDelete) => {
  const response = await agent.delete(`/users/${params.id}`);
  return response;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { logOut } = useLogout();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      logOut();
      await queryClient.invalidateQueries({
        queryKey: [userKeys, usersListKey],
      });
    },
  });
};
