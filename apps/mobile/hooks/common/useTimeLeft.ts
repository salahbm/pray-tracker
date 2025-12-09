import { PrayerTimes } from 'adhan';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter } from 'react-native';

import { SALAHS } from '@/constants/enums';
import {
  cancelAllPrayerNotifications,
  requestNotificationPermissions,
} from '@/lib/notification.permission';
import { useNotificationStore } from '@/store/defaults/notification';
import { schedulePrayerNotificationWithOffset } from '@/lib/reminder';

const useTimeLeft = (prayerTimes: PrayerTimes) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [currentPrayer, setCurrentPrayer] = useState('');
  const { t, i18n } = useTranslation();
  const { prayerNotifications } = useNotificationStore();

  const prayers = useMemo(
    () => [
      { name: SALAHS.FAJR, time: prayerTimes?.fajr },
      { name: SALAHS.SUNRISE, time: prayerTimes?.sunrise },
      { name: SALAHS.DHUHR, time: prayerTimes?.dhuhr },
      { name: SALAHS.ASR, time: prayerTimes?.asr },
      { name: SALAHS.MAGHRIB, time: prayerTimes?.maghrib },
      { name: SALAHS.ISHA, time: prayerTimes?.isha },
    ],
    [prayerTimes]
  );

  const updatePrayerStatus = useCallback(() => {
    if (!prayerTimes) return;

    const now = new Date();
    let current = '';
    let nextPrayerTime = null;

    for (let i = 0; i < prayers.length; i++) {
      if (now >= prayers[i].time) current = prayers[i].name;
      if (now < prayers[i].time && !nextPrayerTime) {
        nextPrayerTime = prayers[i].time;
      }
    }

    // If the last prayer passed → schedule Fajr tomorrow
    if (!nextPrayerTime) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      nextPrayerTime = new PrayerTimes(
        prayerTimes.coordinates,
        tomorrow,
        prayerTimes.calculationParameters
      ).fajr;
    }

    const diff = Math.max(0, Math.floor((nextPrayerTime.getTime() - now.getTime()) / 1000));
    const hours = String(Math.floor(diff / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
    const seconds = String(Math.floor(diff % 60)).padStart(2, '0');

    setTimeLeft(`${hours}:${minutes}:${seconds}`);
    setCurrentPrayer(current);
  }, [prayerTimes, prayers]);

  useEffect(() => {
    updatePrayerStatus();
    const interval = setInterval(updatePrayerStatus, 1000);
    return () => clearInterval(interval);
  }, [updatePrayerStatus]);

  // 📆 Schedule notifications with offset
  const scheduleNotifications = useCallback(async () => {
    if (!prayerTimes || !prayerNotifications.isEnabled) return;

    try {
      // Request permissions first
      const hasPermission = await requestNotificationPermissions();
      if (!hasPermission) {
        console.warn('⚠️ Cannot schedule notifications: permissions not granted');
        return;
      }

      await cancelAllPrayerNotifications();

      for (const { name, time } of prayers) {
        if (time > new Date()) {
          await schedulePrayerNotificationWithOffset(name, time, prayerNotifications.minutesBefore);
        }
      }
    } catch (error) {
      console.error('Error scheduling prayer notifications:', error);
    }
  }, [prayerTimes, prayers, prayerNotifications]);

  // Listen for global "prayer settings updated" events
  useEffect(() => {
    scheduleNotifications();

    const handleSettingsUpdate = () => {
      scheduleNotifications();
    };

    // 📡 Listen for settings updates via DeviceEventEmitter
    const subscription = DeviceEventEmitter.addListener(
      'prayer-notifications-updated',
      handleSettingsUpdate
    );

    return () => {
      subscription.remove();
    };
  }, [scheduleNotifications]);

  return { timeLeft, currentPrayer };
};

export default useTimeLeft;
