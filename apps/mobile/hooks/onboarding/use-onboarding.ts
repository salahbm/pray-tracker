import { useQueryClient } from '@tanstack/react-query';
import { useOnboardingStore } from '@/store/onboarding/onboarding-store';
import { onboarding } from './../../constants/onboarding';
import agent from '@/lib/agent';
import useMutation from '../common/useMutation';
import QueryKeys from '@/constants/query-keys';

export interface OnboardingPreferencePayload {
  prayerKnowledge?: string | null;
  supportNeeded?: string | null;
  learnIslam?: string | null;
  whyHere?: string[];
  locationPermissionGranted?: boolean;
  notificationPermissionGranted?: boolean;
  whereDidYouHearAboutUs?: string | null;
  locationCity?: string | null;
  locationTimezone?: string | null;
  enabledModules?: string[];
  defaultHomeTab?: string | null;
  completedSteps?: string[];
}

export interface OnboardingPreferenceResponse {
  id: string;
  userId: string;
  prayerKnowledge: string | null;
  supportNeeded: string | null;
  learnIslam: string | null;
  whyHere: string[];
  locationPermissionGranted: boolean;
  notificationPermissionGranted: boolean;
  whereDidYouHearAboutUs: string | null;
  locationCity: string | null;
  locationTimezone: string | null;
  enabledModules: string[];
  defaultHomeTab: string | null;
  completedSteps: string[];
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

const onboardingApi = {
  // Upsert onboarding preferences (update or create)
  upsertPreferences: async (
    data: OnboardingPreferencePayload
  ): Promise<OnboardingPreferenceResponse> => {
    const response = await agent.post('/onboarding/preferences', data);
    return response.data;
  },

  // Get current preferences
  getPreferences: async (): Promise<OnboardingPreferenceResponse | null> => {
    const response = await agent.get('/onboarding/preferences');
    return response.data;
  },

  // Mark onboarding as complete
  completeOnboarding: async (): Promise<OnboardingPreferenceResponse> => {
    const response = await agent.post('/onboarding/complete');
    return response.data;
  },
};

export const useOnboarding = () => {
  const {} = useOnboardingStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: onboardingApi.upsertPreferences,
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.onboarding.preferences],
      });
    },
  });
};
