import { useQueryClient } from '@tanstack/react-query';

import useMutation from '../common/useMutation';
import { API_BASE_URL } from '@/constants/config';
import { pendingFriendsList } from '@/constants/query-keys';
import { fireToast } from '@/providers/toaster';

type TParams = {
  userId: string;
  friendEmail: string;
};

const sendRequest = async (params: TParams) => {
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

  if (!res.ok) {
    throw new Error('Failed to send friend request');
  }

  return res.json();
};

export const useRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendRequest,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: [pendingFriendsList] });
        fireToast.success('Friend request sent successfully.');
      },
    },
  });
};
