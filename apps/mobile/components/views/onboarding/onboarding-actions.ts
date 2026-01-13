// hooks/use-onboarding-reducer.ts
import { useReducer, useCallback } from 'react';

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
}

type OnboardingAction =
  | { type: 'SET_CURRENT_STEP'; payload: string }
  | { type: 'SET_PRAYER_KNOWLEDGE'; payload: PrayerKnowledge }
  | { type: 'SET_SUPPORT_NEEDED'; payload: SupportNeeded }
  | { type: 'SET_LEARN_ISLAM'; payload: LearnIslam }
  | { type: 'TOGGLE_WHY_HERE'; payload: WhyHereOption }
  | { type: 'SET_WHY_HERE'; payload: WhyHereOption[] }
  | {
      type: 'SET_LOCATION_PERMISSION';
      payload: { granted: boolean; city?: string; timezone?: string };
    }
  | { type: 'SET_NOTIFICATION_PERMISSION'; payload: boolean }
  | { type: 'COMPLETE_STEP'; payload: string }
  | { type: 'SET_WHERE_DID_YOU_HEAR'; payload: WhereDidYouHearAboutUs };

const initialState: OnboardingState = {
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
};

function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };

    case 'SET_PRAYER_KNOWLEDGE': {
      const value = action.payload;
      const modules = state.enabledModules;

      if (value === 'no_not_yet' || value === 'im_learning') {
        return {
          ...state,
          prayerKnowledge: value,
          enabledModules: [...new Set([...modules, 'learn_prayer_basics', 'guided_salah'])],
          defaultHomeTab: 'Learn',
        };
      }

      return { ...state, prayerKnowledge: value };
    }

    case 'SET_SUPPORT_NEEDED': {
      const value = action.payload;
      const modules = state.enabledModules;

      if (value === 'yes_i_need_support') {
        return {
          ...state,
          supportNeeded: value,
          enabledModules: [...new Set([...modules, 'friends', 'encouragement'])],
        };
      }

      return { ...state, supportNeeded: value };
    }

    case 'SET_LEARN_ISLAM':
      return { ...state, learnIslam: action.payload };

    case 'TOGGLE_WHY_HERE': {
      const value = action.payload;
      const current = state.whyHere;
      const modules = state.enabledModules;

      if (current.includes(value)) {
        return {
          ...state,
          whyHere: current.filter(v => v !== value),
        };
      }

      const newWhyHere = [...current, value];
      let newModules = modules;
      let newHomeTab = state.defaultHomeTab;

      if (value === 'track_progress') {
        newModules = [...new Set([...modules, 'streaks', 'prayer_log', 'weekly_reflection'])];
        newHomeTab = 'Tracker';
      } else if (value === 'learn_how_to_pray') {
        newModules = [...new Set([...modules, 'learn_prayer_basics', 'guided_salah'])];
      }

      return {
        ...state,
        whyHere: newWhyHere,
        enabledModules: newModules,
        defaultHomeTab: newHomeTab,
      };
    }

    case 'SET_WHY_HERE': {
      const values = action.payload;
      const modules = state.enabledModules;
      const updatedModules = new Set(modules);
      let defaultHomeTab = state.defaultHomeTab;

      if (values.includes('track_progress')) {
        ['streaks', 'prayer_log', 'weekly_reflection'].forEach(module =>
          updatedModules.add(module)
        );
        defaultHomeTab = 'Tracker';
      }

      if (values.includes('learn_how_to_pray')) {
        ['learn_prayer_basics', 'guided_salah'].forEach(module => updatedModules.add(module));
      }

      return {
        ...state,
        whyHere: values,
        enabledModules: [...updatedModules],
        defaultHomeTab,
      };
    }

    case 'SET_LOCATION_PERMISSION':
      return {
        ...state,
        locationPermissionGranted: action.payload.granted,
        locationCity: action.payload.city || null,
        locationTimezone: action.payload.timezone || null,
      };

    case 'SET_NOTIFICATION_PERMISSION':
      return {
        ...state,
        notificationPermissionGranted: action.payload,
      };

    case 'COMPLETE_STEP': {
      const stepId = action.payload;
      const completed = state.completedSteps;

      if (completed.includes(stepId)) {
        return state;
      }

      return {
        ...state,
        completedSteps: [...completed, stepId],
      };
    }

    case 'SET_WHERE_DID_YOU_HEAR':
      return {
        ...state,
        whereDidYouHearAboutUs: action.payload,
      };
    default:
      return state;
  }
}

export function useOnboarding() {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  const setCurrentStep = useCallback((step: string) => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: step });
  }, []);

  const setPrayerKnowledge = useCallback((value: PrayerKnowledge) => {
    dispatch({ type: 'SET_PRAYER_KNOWLEDGE', payload: value });
  }, []);

  const setSupportNeeded = useCallback((value: SupportNeeded) => {
    dispatch({ type: 'SET_SUPPORT_NEEDED', payload: value });
  }, []);

  const setLearnIslam = useCallback((value: LearnIslam) => {
    dispatch({ type: 'SET_LEARN_ISLAM', payload: value });
  }, []);

  const toggleWhyHere = useCallback((value: WhyHereOption) => {
    dispatch({ type: 'TOGGLE_WHY_HERE', payload: value });
  }, []);

  const setWhyHere = useCallback((values: WhyHereOption[]) => {
    dispatch({ type: 'SET_WHY_HERE', payload: values });
  }, []);

  const setLocationPermission = useCallback(
    (granted: boolean, city?: string, timezone?: string) => {
      dispatch({
        type: 'SET_LOCATION_PERMISSION',
        payload: { granted, city, timezone },
      });
    },
    []
  );

  const setNotificationPermission = useCallback((granted: boolean) => {
    dispatch({ type: 'SET_NOTIFICATION_PERMISSION', payload: granted });
  }, []);

  const completeStep = useCallback((stepId: string) => {
    dispatch({ type: 'COMPLETE_STEP', payload: stepId });
  }, []);

  const setWhereDidYouHearAboutUs = useCallback((value: WhereDidYouHearAboutUs) => {
    dispatch({ type: 'SET_WHERE_DID_YOU_HEAR', payload: value });
  }, []);

  return {
    // State
    state,

    // All actions
    setCurrentStep,
    setPrayerKnowledge,
    setSupportNeeded,
    setLearnIslam,
    toggleWhyHere,
    setWhyHere,
    setLocationPermission,
    setNotificationPermission,
    completeStep,
    setWhereDidYouHearAboutUs,
  };
}
