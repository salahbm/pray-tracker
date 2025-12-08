import { format } from 'date-fns';
import * as Notifications from 'expo-notifications';
import i18n from 'i18next';
import { Platform } from 'react-native';
import { capitalize } from './utils';

// ============================================================================
// NOTIFICATION PERMISSIONS
// ============================================================================

/**
 * Requests notification permissions from the user.
 * @returns Promise resolving to true if granted, otherwise false.
 */
export const requestNotificationPermissions = async (): Promise<boolean> => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('Notification permissions not granted');
      return false;
    }

    // Configure notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    // Android: register notification channel
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('prayer-reminders', {
        name: 'Prayer Reminders',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#9EF010',
        sound: 'default',
        enableVibrate: true,
        showBadge: true,
      });
    }

    return true;
  } catch (error) {
    console.error('Failed to request notification permissions:', error);
    return false;
  }
};

/**
 * Checks if notification permissions are granted.
 * @returns Promise resolving to true or false.
 */
export const checkNotificationPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await Notifications.getPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Failed to check notification permissions:', error);
    return false;
  }
};

// ============================================================================
// INTERNAL HELPERS
// ============================================================================

/**
 * Returns the emoji assigned to the prayer name via translations.
 */
const getPrayerEmoji = (prayerName: string): string => {
  const key = `common.notifications.emojis.${prayerName.toLowerCase()}`;
  const emoji = i18n.t(key);
  return emoji !== key ? emoji : i18n.t('common.notifications.emojis.default');
};

// ============================================================================
// NOTIFICATION SCHEDULING
// ============================================================================

/**
 * Schedules a prayer notification at a configurable offset before prayer time.
 * @param prayerName Name of the prayer (Fajr, Dhuhr, etc.)
 * @param prayerTime Exact prayer time
 * @param minutesBefore Offset before prayer time (in minutes)
 */
export const schedulePrayerNotificationWithOffset = async (
  prayerName: string,
  prayerTime: Date,
  minutesBefore: number
) => {
  const notificationTime = new Date(prayerTime.getTime() - minutesBefore * 60000);
  const now = new Date();

  // Do not schedule if notification time is in the past
  if (notificationTime <= now) return;

  const formattedTime = format(prayerTime, 'HH:mm');
  const emoji = getPrayerEmoji(prayerName);

  const title = i18n.t('common.notifications.prayer.title', {
    emoji,
    prayer: capitalize(prayerName),
  });

  const body =
    minutesBefore === 0
      ? i18n.t('common.notifications.prayer.bodyNow', {
          prayer: capitalize(prayerName),
          time: formattedTime,
        })
      : i18n.t('common.notifications.prayer.bodyBefore', {
          prayer: capitalize(prayerName),
          minutes: minutesBefore,
          plural: minutesBefore > 1 ? 's' : '',
          time: formattedTime,
        });

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: 'default',
      priority: Notifications.AndroidNotificationPriority.HIGH,
      data: {
        prayerName: capitalize(prayerName),
        prayerTime: prayerTime.toISOString(),
        type: 'prayer_reminder',
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: notificationTime,
    },
  });
};
