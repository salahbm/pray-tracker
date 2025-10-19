import { keepPreviousData, useQuery } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { TUser } from '@/types/user';

interface LeaderboardResponse {
  data: TUser[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const getFriendsLeaderboard = async (
  userId: string,
  page: number = 1,
  limit: number = 50
): Promise<LeaderboardResponse> => {
  const response = await agent.get<LeaderboardResponse>(
    `/leaderboard/friends?userId=${userId}&page=${page}&limit=${limit}`
  );
  return response;
};

export const useGetFriendsLeaderboard = (userId: string, page: number = 1, limit: number = 50) =>
  useQuery({
    queryKey: [...QueryKeys.leaderboard.friends, { userId, page, limit }],
    queryFn: () => getFriendsLeaderboard(userId, page, limit),
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });
