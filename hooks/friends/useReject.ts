import { useQueryClient } from '@tanstack/react-query';

import useMutation from '../common/useMutation';
import { pendingFriendsList } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { fireToast } from '@/providers/toaster';
import { IResponseArray } from '@/types/api';
import { IFriend } from '@/types/friends';

type TParams = {
  userId: string;
  friendId: string;
};

const rejectRequest = async (
  data: TParams,
): Promise<IResponseArray<IFriend>> => {
  const response = await agent('/friends/reject', {
    method: 'DELETE',
    body: JSON.stringify({
      userId: data.userId,
      friendId: data.friendId,
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
        fireToast.success('Friend request canceled successfully.');
      },
    },
  });
};
