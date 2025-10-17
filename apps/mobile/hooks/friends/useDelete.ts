import { useQueryClient } from '@tanstack/react-query';

import { approvedFriendsList } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { IResponseArray } from '@/types/api';
import { IFriend } from '@/types/friends';

import useMutation from '../common/useMutation';

type TParams = {
  friendId: string;
  friendshipId: string;
};

const deleteFriend = async (data: TParams): Promise<IResponseArray<IFriend>> => {
  const response = await agent('/friends/delete', {
    method: 'DELETE',
    body: JSON.stringify({
      friendId: data.friendId,
      friendshipId: data.friendshipId,
    }),
  });
  return response;
};

export const useDeleteFriend = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFriend,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [approvedFriendsList],
        });
      },
    },
  });
};
