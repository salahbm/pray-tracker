import { useMutation, useQueryClient } from '@tanstack/react-query';

import agent from '@/lib/agent';
import { IResponse } from '@/types/api';
import QueryKeys from '@/constants/query-keys';

interface UpdateGroupPayload {
  groupId: string;
  name: string;
  userId: string;
}

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ groupId, name, userId }: UpdateGroupPayload) => {
      const response = await agent.patch<IResponse<UpdateGroupPayload>>(
        `/friends/groups/${groupId}?userId=${userId}`,
        {
          groupId,
          name,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.friends.groups });
    },
  });
};
