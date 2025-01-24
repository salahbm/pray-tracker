// delete user
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userKeys, usersListKey } from '@/constants/query-keys';
import { agent } from '@/lib/fetch';
import { fireToast } from '@/providers/toaster';
import { ErrorData } from '@/types/api';

interface IUserDelete {
  id: string;
}

const deleteUser = async (params: IUserDelete) => {
  const response = await agent('/user', {
    method: 'DELETE',
    body: JSON.stringify({
      id: params.id,
    }),
  });
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
