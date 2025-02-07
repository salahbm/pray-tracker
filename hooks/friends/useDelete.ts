import { useQueryClient } from '@tanstack/react-query';

import useMutation from '../common/useMutation';
import { approvedFriendsList } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { fireToast } from '@/providers/toaster';
import { IResponseArray } from '@/types/api';
import { IFriend } from '@/types/friends';

type TParams = {
  userId: string;
  friendId: string;
};

const deleteFriend = async (
  data: TParams,
): Promise<IResponseArray<IFriend>> => {
  const response = await agent('/friends/delete', {
    method: 'DELETE',
    body: JSON.stringify({
      userId: data.userId,
      friendId: data.friendId,
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
        fireToast.success('Friend request deleted successfully.');
      },
    },
  });
};
