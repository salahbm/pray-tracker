import { useQuery } from '@tanstack/react-query';

import agent from '@/lib/agent';
import { OnboardingPreferences } from '@/types/index';
import { IPaginatedResponse } from '@/types/index';

interface GetOnboardingPreferencesParams {
  page?: number;
  limit?: number;
}

const getOnboardingPreferences = async (
  params: GetOnboardingPreferencesParams
): Promise<IPaginatedResponse<OnboardingPreferences>> => {
  return agent.get<IPaginatedResponse<OnboardingPreferences>>('/onboarding/admin/all', {
    params: params as Record<string, string | number | boolean | undefined>,
  });
};

export const useGetOnboardingPreferences = (params: GetOnboardingPreferencesParams) =>
  useQuery({
    queryKey: ['onboarding', 'preferences', params],
    queryFn: () => getOnboardingPreferences(params),
  });
