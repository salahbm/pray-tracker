import { useQueryClient } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { IResponseArray } from '@/types/api';
import { IFriend } from '@/types/friends';

import useMutation from '../common/useMutation';

type TParams = {
  friendshipId: string;
  friendId: string;
  userId: string;
};

const rejectRequest = async (data: TParams): Promise<IResponseArray<IFriend>> =>
  await agent.patch<IResponseArray<IFriend>>('/friends/reject', {
    userId: data.userId,
    friendshipId: data.friendshipId,
  });

export const useRejectRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectRequest,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: QueryKeys.friends.pending,
        });
      },
    },
  });
};
