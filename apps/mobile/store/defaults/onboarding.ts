// CHecks onboarding visited or not
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface OnboardingState {
  visited: boolean;
  setVisited: (v: boolean) => void;
}

export const useOnboarding = create<OnboardingState>()(
  persist<OnboardingState>(
    set => ({
      visited: false,
      setVisited: (v: boolean) => set({ visited: v }),
    }),
    {
      name: 'onboarding-store', // Key for persistence
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage'
    }
  )
);
