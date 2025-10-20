import { useMutation, useQueryClient } from '@tanstack/react-query';
import agent from '@/lib/agent';
import { IResponse } from '@/types/api';
import QueryKeys from '@/constants/query-keys';

interface CreateGroupPayload {
  userId: string;
  name: string;
}

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateGroupPayload) => {
      const response = await agent.post<IResponse<CreateGroupPayload>>('/friends/groups', payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.friends.groups });
    },
  });
};
