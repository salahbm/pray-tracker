import { keepPreviousData, useQuery } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { IResponseArray } from '@/types/api';
import { ApprovedFriend } from '@/types/friends';

const getFriends = async (userId: string): Promise<IResponseArray<ApprovedFriend>> => {
  const response = await agent.get<IResponseArray<ApprovedFriend>>(
    `/friends/approved?userId=${userId}`
  );

  return response;
};

export const useGetApprovedFriends = (userId: string) =>
  useQuery({
    queryKey: QueryKeys.friends.approved,
    queryFn: () => getFriends(userId),
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });
