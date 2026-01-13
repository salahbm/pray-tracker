// stores/onboarding-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PrayerKnowledge = 'yes_i_know' | 'im_learning' | 'no_not_yet';
export type SupportNeeded = 'yes_i_need_support' | 'some_support' | 'im_good';
export type LearnIslam = 'quran_surahs' | 'basics' | 'im_good';
export type WhyHereOption =
  | 'pray_5_times'
  | 'track_progress'
  | 'learn_how_to_pray'
  | 'just_checking';
export type HomeTab = 'Learn' | 'Tracker' | 'Home' | 'Community';
export type WhereDidYouHearAboutUs =
  | 'friend_family'
  | 'social_media'
  | 'app_store_search'
  | 'masjid_community'
  | 'online_article'
  | 'other';

export interface OnboardingState {
  // Current step
  currentStep: string;

  // User selections
  prayerKnowledge: PrayerKnowledge | null;
  supportNeeded: SupportNeeded | null;
  learnIslam: LearnIslam | null;
  whyHere: WhyHereOption[];
  locationPermissionGranted: boolean;
  notificationPermissionGranted: boolean;
  locationCity: string | null;
  locationTimezone: string | null;
  whereDidYouHearAboutUs: WhereDidYouHearAboutUs | null;

  // Derived state
  enabledModules: string[];
  defaultHomeTab: HomeTab | null;
  completedSteps: string[];

  // Actions
  setCurrentStep: (step: string) => void;
  setPrayerKnowledge: (value: PrayerKnowledge) => void;
  setSupportNeeded: (value: SupportNeeded) => void;
  setLearnIslam: (value: LearnIslam) => void;
  toggleWhyHere: (value: WhyHereOption) => void;
  setWhyHere: (value: WhyHereOption[]) => void;
  setLocationPermission: (granted: boolean, city?: string, timezone?: string) => void;
  setNotificationPermission: (granted: boolean) => void;
  completeStep: (stepId: string) => void;
  setWhereDidYouHearAboutUs: (value: WhereDidYouHearAboutUs) => void;
  reset: () => void;

  // Sync state
  isSyncing: boolean;
  lastSyncedAt: Date | null;
  setIsSyncing: (syncing: boolean) => void;
  setLastSyncedAt: (date: Date) => void;
}

const initialState = {
  currentStep: 'splash',
  prayerKnowledge: null,
  supportNeeded: null,
  learnIslam: null,
  whyHere: [],
  locationPermissionGranted: false,
  notificationPermissionGranted: false,
  locationCity: null,
  locationTimezone: null,
  whereDidYouHearAboutUs: null,
  enabledModules: [],
  defaultHomeTab: null,
  completedSteps: [],
  isSyncing: false,
  lastSyncedAt: null,
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentStep: step => set({ currentStep: step }),

      setPrayerKnowledge: value => {
        set({ prayerKnowledge: value });

        // Auto-derive enabled modules
        const modules = get().enabledModules;
        if (value === 'no_not_yet' || value === 'im_learning') {
          set({
            enabledModules: [...new Set([...modules, 'learn_prayer_basics', 'guided_salah'])],
            defaultHomeTab: 'Learn',
          });
        }
      },

      setSupportNeeded: value => {
        set({ supportNeeded: value });

        const modules = get().enabledModules;
        if (value === 'yes_i_need_support') {
          set({
            enabledModules: [...new Set([...modules, 'friends', 'encouragement'])],
          });
        }
      },

      setLearnIslam: value => set({ learnIslam: value }),

      toggleWhyHere: value => {
        const current = get().whyHere;
        const modules = get().enabledModules;

        if (current.includes(value)) {
          set({ whyHere: current.filter(v => v !== value) });
        } else {
          set({ whyHere: [...current, value] });

          // Auto-derive modules based on selection
          if (value === 'track_progress') {
            set({
              enabledModules: [
                ...new Set([...modules, 'streaks', 'prayer_log', 'weekly_reflection']),
              ],
              defaultHomeTab: 'Tracker',
            });
          } else if (value === 'learn_how_to_pray') {
            set({
              enabledModules: [...new Set([...modules, 'learn_prayer_basics', 'guided_salah'])],
            });
          }
        }
      },

      setWhyHere: values => {
        const modules = get().enabledModules;
        const updatedModules = new Set(modules);
        let defaultHomeTab = get().defaultHomeTab;

        if (values.includes('track_progress')) {
          ['streaks', 'prayer_log', 'weekly_reflection'].forEach(module =>
            updatedModules.add(module)
          );
          defaultHomeTab = 'Tracker';
        }

        if (values.includes('learn_how_to_pray')) {
          ['learn_prayer_basics', 'guided_salah'].forEach(module => updatedModules.add(module));
        }

        set({
          whyHere: values,
          enabledModules: [...updatedModules],
          defaultHomeTab,
        });
      },

      setLocationPermission: (granted, city, timezone) =>
        set({
          locationPermissionGranted: granted,
          locationCity: city || null,
          locationTimezone: timezone || null,
        }),

      setNotificationPermission: granted => set({ notificationPermissionGranted: granted }),

      completeStep: stepId => {
        const completed = get().completedSteps;
        if (!completed.includes(stepId)) {
          set({ completedSteps: [...completed, stepId] });
        }
      },

      setWhereDidYouHearAboutUs: value => set({ whereDidYouHearAboutUs: value }),

      reset: () => set(initialState),

      setIsSyncing: syncing => set({ isSyncing: syncing }),

      setLastSyncedAt: date => set({ lastSyncedAt: date }),
    }),
    {
      name: 'onboarding-storage',
      partialize: state => ({
        // Only persist user selections, not sync state
        currentStep: state.currentStep,
        prayerKnowledge: state.prayerKnowledge,
        supportNeeded: state.supportNeeded,
        learnIslam: state.learnIslam,
        whyHere: state.whyHere,
        locationPermissionGranted: state.locationPermissionGranted,
        notificationPermissionGranted: state.notificationPermissionGranted,
        locationCity: state.locationCity,
        locationTimezone: state.locationTimezone,
        enabledModules: state.enabledModules,
        defaultHomeTab: state.defaultHomeTab,
        completedSteps: state.completedSteps,
        whereDidYouHearAboutUs: state.whereDidYouHearAboutUs,
      }),
    }
  )
);
