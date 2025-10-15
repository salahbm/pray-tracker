import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { pendingFriendsList } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { IResponse } from '@/types/api';
import { FriendRequestResponse } from '@/types/friends';

const getFriends = async (
  userId: string,
): Promise<IResponse<FriendRequestResponse>> => {
  const response = await agent(`/friends/pending?userId=${userId}`, {
    method: 'GET',
  });

  return response;
};

export const useGetPendingFriends = (userId: string) =>
  useQuery({
    queryKey: [pendingFriendsList],
    queryFn: () => getFriends(userId),
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });
