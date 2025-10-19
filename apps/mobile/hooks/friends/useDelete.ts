import { useQueryClient } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { IResponseArray } from '@/types/api';
import { IFriend } from '@/types/friends';

import useMutation from '../common/useMutation';

type TParams = {
  friendId: string;
  friendshipId: string;
};

const deleteFriend = async (data: TParams): Promise<IResponseArray<IFriend>> =>
  await agent.delete<IResponseArray<IFriend>>(
    `/friends/remove?friendId=${data.friendId}&friendshipId=${data.friendshipId}`
  );

export const useDeleteFriend = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFriend,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: QueryKeys.friends.approved,
        });
      },
    },
  });
};
