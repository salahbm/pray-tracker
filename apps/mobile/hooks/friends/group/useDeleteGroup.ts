import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IResponse, IResponseArray } from '@/types/api';
import { IFriend } from '@/types/friends';

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
      const response = await agent.delete<IResponseArray<IResponse<IFriend>>>(
        `/friends/groups/${groupId}?userId=${userId}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.friends.groups });
    },
  });
};
