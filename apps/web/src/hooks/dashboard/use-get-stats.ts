import { useQuery } from '@tanstack/react-query';
import agent from '@/lib/agent';
import { DashboardStats } from '@/types/index';

const getDashboardStats = async (): Promise<DashboardStats> => {
  const data = await agent.get<DashboardStats>('/admin/stats');
  return data;
};

export const useGetDashboardStats = () =>
  useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: getDashboardStats,
  });
