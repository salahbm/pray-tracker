import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface PrayerNotificationSettings {
  isEnabled: boolean;
  minutesBefore: number;
}

export interface NotificationState {
  prayerNotifications: PrayerNotificationSettings;
  setPrayerNotifications: (settings: PrayerNotificationSettings) => void;
  setMinutesBefore: (minutes: number) => void;
  toggleEnabled: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist<NotificationState>(
    set => ({
      prayerNotifications: {
        isEnabled: true,
        minutesBefore: 10,
      },
      setPrayerNotifications: settings =>
        set({ prayerNotifications: settings }),
      setMinutesBefore: minutes =>
        set(state => ({
          prayerNotifications: {
            ...state.prayerNotifications,
            minutesBefore: minutes,
          },
        })),
      toggleEnabled: () =>
        set(state => ({
          prayerNotifications: {
            ...state.prayerNotifications,
            isEnabled: !state.prayerNotifications.isEnabled,
          },
        })),
    }),
    {
      name: 'notification-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
