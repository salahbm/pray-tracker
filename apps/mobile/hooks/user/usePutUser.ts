import { useMutation, useQueryClient } from '@tanstack/react-query';


import agent from '@/lib/agent';
import QueryKeys from '@/constants/query-keys';

interface IUserParams {
  id: string;
  name?: string;
  image?: string;
  locale?: string;
  toast?: boolean;
}

const updateUser = async (params: IUserParams) => {
  if (!params.id) return null;

  const { id, toast, ...updateData } = params;
  const response = await agent.patch(`/users/me`, updateData);
  return response;
};

export const usePutUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QueryKeys.users.detail,
      });
    },
  });
};
