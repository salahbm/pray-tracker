import { useQuery } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';

interface UserRankResponse {
  userId: string;
  rank: number;
  totalPoints: number;
}

const getUserRank = async (userId: string): Promise<UserRankResponse> => {
  const response = await agent.get<UserRankResponse>(`/leaderboard/rank?userId=${userId}`);
  return response;
};

export const useGetUserRank = (userId: string) =>
  useQuery({
    queryKey: [...QueryKeys.leaderboard.rank, { userId }],
    queryFn: () => getUserRank(userId),
    enabled: !!userId,
  });
