import { useMutation, useQueryClient } from '@tanstack/react-query';
import agent from '@/lib/agent';
import { IResponse, IResponseArray } from '@/types/api';
import QueryKeys from '@/constants/query-keys';
import { FriendActivity } from '@/types/friends';

interface AddMemberPayload {
  groupId: string;
  friendId: string;
  userId: string;
}

interface GroupMember {
  id: string;
  userId: string;
  username: string;
  email: string;
  photo: string;
  prayer: {
    fajr: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
    nafl: number;
  };
}

interface GroupMembersResponse {
  id: string;
  name: string;
  members: GroupMember[];
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
    onMutate: async variables => {
      const groupKey = [
        ...QueryKeys.friends.groupMembers,
        { groupId: variables.groupId, userId: variables.userId },
      ];

      await queryClient.cancelQueries({ queryKey: groupKey });

      const previousGroup = queryClient.getQueryData<GroupMembersResponse>(groupKey);

      const friendQueries = queryClient.getQueriesData<IResponseArray<FriendActivity>>({
        queryKey: QueryKeys.friends.all,
      });

      const matchedFriend = friendQueries
        .flatMap(([, data]) => data?.data ?? [])
        .find(friend => friend.friendUserId === variables.friendId);

      if (previousGroup && matchedFriend) {
        const optimisticMember: GroupMember = {
          id: `optimistic-${matchedFriend.friendUserId}`,
          userId: matchedFriend.friendUserId,
          username: matchedFriend.username,
          email: matchedFriend.email,
          photo: matchedFriend.photo,
          prayer: {
            fajr: 0,
            dhuhr: 0,
            asr: 0,
            maghrib: 0,
            isha: 0,
            nafl: 0,
          },
        };

        queryClient.setQueryData<GroupMembersResponse>(groupKey, current => {
          if (!current) return current;
          if (current.members.some(member => member.userId === optimisticMember.userId)) {
            return current;
          }
          return {
            ...current,
            members: [...current.members, optimisticMember],
          };
        });
      }

      return { previousGroup };
    },
    onError: (_error, variables, context) => {
      if (context?.previousGroup) {
        queryClient.setQueryData(
          [
            ...QueryKeys.friends.groupMembers,
            { groupId: variables.groupId, userId: variables.userId },
          ],
          context.previousGroup
        );
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.friends.groups, type: 'all' });
      queryClient.invalidateQueries({
        queryKey: [
          ...QueryKeys.friends.groupMembers,
          { groupId: variables.groupId, userId: variables.userId },
        ],
        type: 'all',
      });
    },
  });
};
