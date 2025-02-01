import { useQueryClient } from '@tanstack/react-query';
import useMutation from '../common/useMutation';
import { friendsList } from '@/constants/query-keys';
import { agent } from '@/lib/fetch';
import { fireToast } from '@/providers/toaster';
import { ErrorData, IResponseArray } from '@/types/api';
import { IFriend } from '@/types/friends';

type TParams = {
  userId: string;
  friendEmail: string;
};

const sendRequest = async (
  params: TParams,
): Promise<IResponseArray<IFriend>> => {
  console.log(`params:`, params);
  try {
    const res = await agent('/friends/send', {
      method: 'POST',
      body: JSON.stringify({
        userId: params.userId,
        friendEmail: params.friendEmail,
      }),
    });
    console.log(`res:`, res);

    return res;
  } catch (error) {
    console.error('Send friend request error:', error);
    throw error;
  }
};

export const useSendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendRequest,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [friendsList],
        });
        fireToast.success('Friend request sent successfully!');
      },
      onError: (error: ErrorData) => {
        fireToast.error(error.message);
      },
    },
  });
};
