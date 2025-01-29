import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userKeys } from '@/constants/query-keys';
import { agent } from '@/lib/fetch';
import { fireToast } from '@/providers/toaster';

interface IUserParams {
  id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  password?: string;
}

const updateUser = async (params: IUserParams) => {
  const response = await agent('/user', {
    method: 'PUT',
    body: JSON.stringify({
      id: params.id,
      username: params.username,
      firstName: params.firstName,
      lastName: params.lastName,
      photo: params.photo,
      password: params.password,
    }),
  });
  return response;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [userKeys],
      });
      fireToast.success(data.message);
    },
  });
};
