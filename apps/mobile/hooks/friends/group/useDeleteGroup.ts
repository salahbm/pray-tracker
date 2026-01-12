import { useMutation, useQueryClient } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';

interface DeleteGroupPayload {
  groupId: string;
  userId: string;
}

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ groupId, userId }: DeleteGroupPayload) => {
      const response = await agent.delete<{ message: string }>(
        `/friends/groups/${groupId}?userId=${userId}`
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.friends.groups });
    },
  });
};
