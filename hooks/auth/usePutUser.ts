import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userKeys } from '@/constants/query-keys';
import { agent } from '@/lib/agent';

interface IUserParams {
  id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  password?: string;

  deviceToken?: string;
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
      deviceToken: params.deviceToken,
    }),
  });
  return response;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [userKeys],
      });
    },
  });
};
