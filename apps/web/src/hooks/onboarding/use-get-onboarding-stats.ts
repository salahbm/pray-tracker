import { useQuery } from '@tanstack/react-query';

import agent from '@/lib/agent';

interface OnboardingStats {
  total: number;
  prayerKnowledge: Record<string, number>;
  attributionSources: Record<string, number>;
  defaultHomeTab: Record<string, number>;
  locationPermissionGranted: number;
  notificationPermissionGranted: number;
}

const getOnboardingStats = async (): Promise<OnboardingStats> => {
  return agent.get<OnboardingStats>('/onboarding/admin/stats');
};

export const useGetOnboardingStats = () =>
  useQuery({
    queryKey: ['onboarding', 'stats'],
    queryFn: getOnboardingStats,
  });
