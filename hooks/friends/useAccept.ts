import { useQueryClient } from '@tanstack/react-query';

import useMutation from '../common/useMutation';
import { friendsList } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { fireToast } from '@/providers/toaster';
import { ErrorData, IResponseArray } from '@/types/api';
import { IFriend } from '@/types/friends';

type TParams = {
  userId: string;
  friendId: string;
};

const acceptRequest = async (
  data: TParams,
): Promise<IResponseArray<IFriend>> => {
  const response = await agent('/friends/accept', {
    method: 'POST',
    body: JSON.stringify({
      userId: data.userId,
      friendId: data.friendId,
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
          queryKey: [friendsList],
        });
      },
      onError: (error: ErrorData) => {
        fireToast.error(error.message);
      },
    },
  });
};
