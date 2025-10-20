import { useMutation, useQueryClient } from '@tanstack/react-query';
import agent from '@/lib/agent';
import { IResponse } from '@/types/api';
import QueryKeys from '@/constants/query-keys';

interface AddMemberPayload {
  groupId: string;
  friendId: string;
  userId: string;
}

export const useAddMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ groupId, friendId, userId }: AddMemberPayload) => {
      const response = await agent.post<IResponse<AddMemberPayload>>(
        `/friends/groups/members?userId=${userId}`,
        {
          groupId,
          friendId,
        }
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.friends.groups, type: 'all' });
      queryClient.invalidateQueries({
        queryKey: [...QueryKeys.friends.groupMembers, { groupId: variables.groupId }],
        type: 'all',
      });
    },
  });
};
