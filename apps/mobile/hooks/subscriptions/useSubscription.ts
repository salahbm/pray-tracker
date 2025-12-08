import { useQuery } from '@tanstack/react-query';
import agent from '@/lib/agent';
import { IResponse } from '@/types/api';
import { Subscription } from '@/types/subscription';
import QueryKeys from '@/constants/query-keys';

/**
 * Get user's subscription status from backend
 */
export const useSubscription = (userId?: string) => {
  return useQuery({
    queryKey: [...QueryKeys.subscriptions.status, { userId }],
    queryFn: async () => {
      const response = await agent.get<IResponse<Subscription>>('/subscriptions/status');
      return response.data;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
