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

const getGlobalLeaderboard = async (
  page: number = 1,
  limit: number = 50
): Promise<LeaderboardResponse> =>
  await agent.get<LeaderboardResponse>(`/leaderboard/global?page=${page}&limit=${limit}`);

interface UseGlobalLeaderboardOptions {
  enabled?: boolean;
}

export const useGetGlobalLeaderboard = (
  page: number = 1,
  limit: number = 50,
  options: UseGlobalLeaderboardOptions = {}
) =>
  useQuery({
    queryKey: [...QueryKeys.leaderboard.global, { page, limit }],
    queryFn: () => getGlobalLeaderboard(page, limit),
    placeholderData: keepPreviousData,
    enabled: options.enabled ?? true,
  });
