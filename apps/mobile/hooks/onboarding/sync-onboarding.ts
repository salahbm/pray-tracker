import { submitOnboardingPreferences } from '@/hooks/onboarding/use-onboarding';
import { useOnboardingStore } from '@/store/defaults/onboarding';

export const syncOnboardingPreferences = async () => {
  const { preferences, clearPreferences } = useOnboardingStore.getState();

  if (!preferences) {
    return;
  }

  try {
    await submitOnboardingPreferences(preferences);
    clearPreferences();
  } catch (error) {
    console.error('Failed to sync onboarding preferences', error);
  }
};
