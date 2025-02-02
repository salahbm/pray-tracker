import { useQueryClient } from '@tanstack/react-query';

import useMutation from '../common/useMutation';
import { friendsList } from '@/constants/query-keys';
import { fireToast } from '@/providers/toaster';
import { agent } from '@/lib/agent';
import { ErrorData } from '@/types/api';
import { API_BASE_URL } from '@/constants/config';

type TParams = {
  userId: string;
  friendEmail: string;
};

const sendRequest = async (params: TParams) => {
  console.log('params:', params);
  try {
    const res = await fetch(`${API_BASE_URL}/friends/request`, {
      method: 'POST',
      body: JSON.stringify({
        userId: params.userId,
        friendEmail: params.friendEmail,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(`res:`, res);

    if (!res.ok) {
      throw new Error('Failed to send friend request');
    }

    return res.json();
  } catch (error) {
    console.error('Send friend request error:', error);
    throw error;
  }
};

export const useRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendRequest,
    options: {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({ queryKey: [friendsList] });
        fireToast.success('Friend request sent successfully.');
      },
      onError: (error: ErrorData) => {
        console.error('Mutation error:', error);
        fireToast.error(error?.message ?? 'Failed to send friend request.');
      },
    },
  });
};
