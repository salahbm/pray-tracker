import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StoreReview from 'expo-store-review';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AppRatingState {
  prayerToggleCount: number;
  hasPurchased: boolean;
  ratingPromptCount: number;
  lastPromptDate: string | null;

  // Actions
  incrementPrayerToggle: () => Promise<void>;
  markAsPurchased: () => Promise<void>;
  checkAndPromptRating: () => Promise<void>;
  resetCounts: () => void;
}

const MAX_RATING_PROMPTS = 2;
const PRAYER_TOGGLES_THRESHOLD = 5;
const MIN_DAYS_BETWEEN_PROMPTS = 30;

export const useAppRatingStore = create<AppRatingState>()(
  persist(
    (set, get) => ({
      prayerToggleCount: 0,
      hasPurchased: false,
      ratingPromptCount: 0,
      lastPromptDate: null,

      incrementPrayerToggle: async () => {
        const state = get();
        const newCount = state.prayerToggleCount + 1;

        set({ prayerToggleCount: newCount });

        // Check if we should prompt for rating after 5 toggles
        if (newCount >= PRAYER_TOGGLES_THRESHOLD && state.ratingPromptCount < MAX_RATING_PROMPTS) {
          await get().checkAndPromptRating();
        }
      },

      markAsPurchased: async () => {
        const state = get();

        set({ hasPurchased: true });

        // Prompt for rating after purchase if not already shown twice
        if (state.ratingPromptCount < MAX_RATING_PROMPTS) {
          await get().checkAndPromptRating();
        }
      },

      checkAndPromptRating: async () => {
        const state = get();

        // Don't prompt if already shown twice
        if (state.ratingPromptCount >= MAX_RATING_PROMPTS) {
          return;
        }

        // Check if enough time has passed since last prompt
        if (state.lastPromptDate) {
          const lastPrompt = new Date(state.lastPromptDate);
          const now = new Date();
          const daysSinceLastPrompt = Math.floor(
            (now.getTime() - lastPrompt.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (daysSinceLastPrompt < MIN_DAYS_BETWEEN_PROMPTS) {
            return;
          }
        }

        // Check if store review is available
        const isAvailable = await StoreReview.isAvailableAsync();
        if (!isAvailable) {
          return;
        }

        // Request review
        await StoreReview.requestReview();

        // Update state
        set({
          ratingPromptCount: state.ratingPromptCount + 1,
          lastPromptDate: new Date().toISOString(),
          prayerToggleCount: 0, // Reset counter after showing prompt
        });
      },

      resetCounts: () => {
        set({
          prayerToggleCount: 0,
          hasPurchased: false,
          ratingPromptCount: 0,
          lastPromptDate: null,
        });
      },
    }),
    {
      name: 'app-rating-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
