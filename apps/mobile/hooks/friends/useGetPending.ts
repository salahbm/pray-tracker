import { keepPreviousData, useQuery } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { IResponse } from '@/types/api';
import { FriendRequestResponse } from '@/types/friends';

const getFriends = async (userId: string): Promise<IResponse<FriendRequestResponse>> => {
  const response = await agent.get<IResponse<FriendRequestResponse>>(
    `/friends/pending?userId=${userId}`
  );

  return response;
};

export const useGetPendingFriends = (userId: string) =>
  useQuery({
    queryKey: QueryKeys.friends.pending,
    queryFn: () => getFriends(userId),
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });
