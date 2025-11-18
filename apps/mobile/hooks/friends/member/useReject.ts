import { useQueryClient } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { IResponse } from '@/types/api';

import useMutation from '../../common/useMutation';

type TParams = {
  friendshipId: string;
  userId: string;
};

const rejectRequest = async (data: TParams): Promise<IResponse<null>> =>
  await agent.patch<IResponse<null>>('/friends/reject', {
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
          queryKey: QueryKeys.friends.all,
          type: 'all',
          exact: false,
        });
      },
    },
  });
};
