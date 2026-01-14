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
}
