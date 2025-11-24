import { useMutation, useQueryClient } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';

import { useLogout } from '../auth/useLogOut';

const deleteUser = async (id: string) => await agent.delete(`/users/${id}`);

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { logOut } = useLogout();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      logOut();
      await queryClient.invalidateQueries({
        queryKey: QueryKeys.users.all,
      });
    },
  });
};
