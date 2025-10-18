import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userKeys } from '@/constants/query-keys';
import agent from '@/lib/agent';

interface IUserParams {
  id: string;
  name?: string;
  image?: string;
  locale?: string;
}

const updateUser = async (params: IUserParams) => {
  if (!params.id) return null;

  const { id, ...updateData } = params;
  const response = await agent.patch(`/users/${id}`, updateData);
  return response;
};

export const usePutUser = () => {
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
