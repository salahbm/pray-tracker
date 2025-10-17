import { useQueryClient } from '@tanstack/react-query';

import { approvedFriendsList, pendingFriendsList } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { IResponse, IResponseArray } from '@/types/api';
import { IFriend } from '@/types/friends';

import useMutation from '../common/useMutation';

type TParams = {
  friendshipId: string;
  friendId: string;
  userId: string;
};

const acceptRequest = async (data: TParams): Promise<IResponseArray<IResponse<IFriend>>> => {
  const response = await agent('/friends/approve', {
    method: 'POST',
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
          queryKey: [pendingFriendsList],
        });
        await queryClient.invalidateQueries({
          queryKey: [approvedFriendsList],
        });
      },
    },
  });
};
