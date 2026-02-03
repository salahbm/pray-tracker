import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UpdateBannerState {
  dismissedAt: number | null;
  lastCheckedAt: number | null;
  setDismissed: () => void;
  setLastChecked: () => void;
  shouldCheck: () => boolean;
  shouldShow: () => boolean;
}

const CHECK_INTERVAL = 1000 * 60 * 60 * 24; // Check once per day

export const useUpdateBannerStore = create<UpdateBannerState>()(
  persist(
    (set, get) => ({
      dismissedAt: null,
      lastCheckedAt: null,

      setDismissed: () => set({ dismissedAt: Date.now() }),

      setLastChecked: () => set({ lastCheckedAt: Date.now() }),

      shouldCheck: (): boolean => {
        const state = get();
        if (!state.lastCheckedAt) return true;
        return Date.now() - state.lastCheckedAt > CHECK_INTERVAL;
      },

      shouldShow: (): boolean => {
        const state = get();
        if (!state.dismissedAt) return true;
        return Date.now() - state.dismissedAt > CHECK_INTERVAL;
      },
    }),
    {
      name: 'update-banner-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
