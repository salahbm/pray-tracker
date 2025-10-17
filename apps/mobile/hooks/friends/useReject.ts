import { useQueryClient } from '@tanstack/react-query';

import { pendingFriendsList } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { IResponseArray } from '@/types/api';
import { IFriend } from '@/types/friends';

import useMutation from '../common/useMutation';

type TParams = {
  friendshipId: string;
  friendId: string;
  userId: string;
};

const rejectRequest = async (data: TParams): Promise<IResponseArray<IFriend>> => {
  const response = await agent('/friends/reject', {
    method: 'DELETE',
    body: JSON.stringify({
      userId: data.userId,
      friendId: data.friendId,
      friendshipId: data.friendshipId,
    }),
  });
  return response;
};

export const useRejectRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectRequest,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [pendingFriendsList],
        });
      },
    },
  });
};
