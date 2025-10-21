import { useInfiniteQuery } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { IResponseArray } from '@/types/api';
import { FriendActivity } from '@/types/friends';

interface GetAllFriendsParams {
  userId: string;
  page?: number;
  limit?: number;
}

const getAllFriends = async ({
  userId,
  page = 1,
  limit = 20,
}: GetAllFriendsParams): Promise<IResponseArray<FriendActivity>> => {
  const response = await agent.get<IResponseArray<FriendActivity>>(
    `/friends/all?userId=${userId}&page=${page}&limit=${limit}`
  );

  return response;
};

export const useGetAllFriends = (userId: string, limit: number = 20) =>
  useInfiniteQuery({
    queryKey: [...QueryKeys.friends.all, { userId, limit }],
    queryFn: ({ pageParam = 1 }) => getAllFriends({ userId, page: pageParam as number, limit }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data || lastPage.data.length < limit) {
        return undefined;
      }
      return allPages.length + 1;
    },
    initialPageParam: 1,
    enabled: !!userId,
  });
