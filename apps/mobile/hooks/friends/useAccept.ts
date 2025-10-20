import { useQueryClient } from '@tanstack/react-query';

import agent from '@/lib/agent';
import { IResponse, IResponseArray } from '@/types/api';
import { IFriend } from '@/types/friends';

import useMutation from '../common/useMutation';
import QueryKeys from '@/constants/query-keys';

type TParams = {
  friendshipId: string;
  friendId: string;
  userId: string;
};

const acceptRequest = async (data: TParams): Promise<IResponseArray<IResponse<IFriend>>> => {
  const response = await agent.post<IResponseArray<IResponse<IFriend>>>('/friends/approve', {
    body: JSON.stringify({
      userId: data.userId,
      friendId: data.friendId,
      friendshipId: data.friendshipId,
    }),
  });
  return response;
};

export const useAcceptRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: acceptRequest,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: QueryKeys.friends.pending,
        });
        await queryClient.invalidateQueries({
          queryKey: QueryKeys.friends.approved,
          type: 'all',
          exact: false,
        });
        await queryClient.invalidateQueries({
          queryKey: QueryKeys.friends.groups,
          type: 'all',
          exact: false,
        });
        await queryClient.invalidateQueries({
          queryKey: QueryKeys.friends.groupMembers,
          type: 'all',
          exact: false,
        });
      },
    },
  });
};
