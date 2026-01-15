import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PremiumState {
  isPremium: boolean;
  lastChecked: number | null;
  setIsPremium: (isPremium: boolean) => void;
  shouldRefetch: () => boolean;
}

const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

export const usePremiumStore = create<PremiumState>()(
  persist(
    (set, get) => ({
      isPremium: false,
      lastChecked: null,
      setIsPremium: (isPremium: boolean) =>
        set({
          isPremium,
          lastChecked: Date.now(),
        }),
      shouldRefetch: () => {
        const { lastChecked } = get();
        if (!lastChecked) return true;
        return Date.now() - lastChecked > CACHE_DURATION;
      },
    }),
    {
      name: 'premium-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
