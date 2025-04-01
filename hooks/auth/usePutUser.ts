import { useQueryClient } from '@tanstack/react-query';

import useMutation from '../common/useMutation';
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
  toast?: boolean;
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
      toast: params.toast,
    }),
  });
  return response;
};

export const usePutUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [userKeys],
        });
      },
    },
  });
};
