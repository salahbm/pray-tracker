// CHecks onboarding visited or not
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { OnboardingPreferencePayload } from '@/types/onboarding';

export interface OnboardingState {
  visited: boolean;
  preferences: OnboardingPreferencePayload | null;
  setVisited: (v: boolean) => void;
  setPreferences: (payload: OnboardingPreferencePayload) => void;
  clearPreferences: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist<OnboardingState>(
    set => ({
      visited: false,
      preferences: null,
      setVisited: (v: boolean) => set({ visited: v }),
      setPreferences: (payload: OnboardingPreferencePayload) => set({ preferences: payload }),
      clearPreferences: () => set({ preferences: null }),
    }),
    {
      name: 'onboarding-store', // Key for persistence
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage'
    }
  )
);
