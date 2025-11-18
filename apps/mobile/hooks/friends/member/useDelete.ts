import { useQueryClient } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { IResponse } from '@/types/api';

import useMutation from '../../common/useMutation';

type TParams = {
  userId: string;
  friendshipId: string;
};

const deleteFriend = async (data: TParams): Promise<IResponse<null>> =>
  await agent.delete<IResponse<null>>(
    `/friends/remove?userId=${data.userId}&friendshipId=${data.friendshipId}`
  );

export const useDeleteFriend = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFriend,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: QueryKeys.friends.all,
          type: 'all',
        });
        await queryClient.invalidateQueries({
          queryKey: QueryKeys.friends.groups,
          type: 'all',
        });
        await queryClient.invalidateQueries({
          queryKey: QueryKeys.friends.groupMembers,
          type: 'all',
        });
        await queryClient.invalidateQueries({
          queryKey: QueryKeys.leaderboard.friends,
          type: 'all',
        });
      },
    },
  });
};
