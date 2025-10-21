import { useMutation, useQueryClient } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { IResponse, IResponseArray } from '@/types/api';
import { IFriend } from '@/types/friends';

interface RemoveMemberPayload {
  groupId: string;
  memberId: string;
  userId: string;
}

export const useRemoveMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ groupId, memberId, userId }: RemoveMemberPayload) => {
      const response = await agent.delete<IResponseArray<IResponse<IFriend>>>(
        `/friends/groups/members?userId=${userId}`,
        { groupId, memberId }
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.friends.groups });
      queryClient.invalidateQueries({
        queryKey: [...QueryKeys.friends.groupMembers, { groupId: variables.groupId }],
      });
    },
  });
};
