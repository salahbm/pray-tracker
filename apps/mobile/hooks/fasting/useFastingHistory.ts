import { useQuery } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { FastingEntry } from '@/types/fasting';

const getFastingHistory = async (): Promise<FastingEntry[]> => {
  return agent.get<FastingEntry[]>('/fasting');
};

export const useFastingHistory = (options?: { enabled?: boolean; userId?: string }) => {
  return useQuery({
    queryKey: [...QueryKeys.fasting.history, { userId: options?.userId }],
    queryFn: getFastingHistory,
    enabled: options?.enabled ?? true,
  });
};
