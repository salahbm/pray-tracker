import { useQuery } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';

export interface OnboardingPreferences {
  locationCity: string | null;
  locationTimezone: string | null;
}

const getOnboardingPreferences = async (): Promise<OnboardingPreferences | null> => {
  const response = await agent.get('/onboarding/preferences');
  return response.data ?? null;
};

export const useGetOnboardingPreferences = () =>
  useQuery({
    queryKey: QueryKeys.onboarding.preferences,
    queryFn: getOnboardingPreferences,
  });
