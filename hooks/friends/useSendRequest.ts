import { useQueryClient } from '@tanstack/react-query';
import useMutation from '../common/useMutation';
import { friendsList } from '@/constants/query-keys';
import { fireToast } from '@/providers/toaster';
import { ErrorData } from '@/types/api';

type TParams = {
  userId: string;
  friendEmail: string;
};

const sendRequest = async (params: TParams) => {
  console.log(`params:`, params);
  try {
    const res = await fetch('/api/friends/send', {
      method: 'POST',
      body: JSON.stringify({
        userId: params.userId,
        friendEmail: params.friendEmail,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const responseJson = await res.json().catch(() => null); // Prevent crashing if not JSON

    if (!res.ok) {
      console.error('Failed request:', responseJson || res);
      throw new Error(responseJson?.message || 'Something went wrong.');
    }

    return responseJson;
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
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({ queryKey: [friendsList] });
        fireToast.success(data?.message ?? 'Friend request sent successfully.');
      },
      onError: (error: any) => {
        console.error('Mutation error:', error);
        fireToast.error(error?.message ?? 'Failed to send friend request.');
      },
    },
  });
};
