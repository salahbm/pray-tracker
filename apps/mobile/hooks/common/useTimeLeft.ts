import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';

import { SALAHS } from '@/constants/enums';
import {
  cancelAllPrayerNotifications,
  requestNotificationPermissions,
} from '@/lib/notification.permission';
import { schedulePrayerNotificationWithOffset } from '@/lib/reminder';
import { useNotificationStore } from '@/store/defaults/notification';
import { PrayerTimesData } from '@/types/prayer-times';

const useTimeLeft = (prayerTimes: PrayerTimesData | null) => {
  const [timeLeft, setTimeLeft] = useState('00:00:00');
  const [currentPrayer, setCurrentPrayer] = useState<string>('');
  const [nextPrayer, setNextPrayer] = useState<string>('');

  // Use a Ref for the target time so the interval doesn't need to recalculate it
  const targetTimeRef = useRef<Date | null>(null);

  const { prayerNotifications } = useNotificationStore();

  // 1. Memoize the prayers array to avoid recreation on every render
  const prayers = useMemo(() => {
    if (!prayerTimes) return [];
    return [
      { name: SALAHS.FAJR, time: prayerTimes.fajr },
      { name: SALAHS.SUNRISE, time: prayerTimes.sunrise },
      { name: SALAHS.DHUHR, time: prayerTimes.dhuhr },
      { name: SALAHS.ASR, time: prayerTimes.asr },
      { name: SALAHS.MAGHRIB, time: prayerTimes.maghrib },
      { name: SALAHS.ISHA, time: prayerTimes.isha },
    ];
  }, [prayerTimes]);

  // 2. Logic to determine Current & Next prayer (Runs only when needed)
  const determineNextPrayer = useCallback(() => {
    if (!prayerTimes || !prayers.length) return;

    const now = new Date();
    let foundNext = false;
    let currentName = '';

    // Find the immediate next prayer
    for (const p of prayers) {
      if (p.time > now) {
        targetTimeRef.current = p.time;
        setNextPrayer(p.name);
        foundNext = true;
        break;
      }
      currentName = p.name; // Keep tracking the last passed prayer
    }

    setCurrentPrayer(currentName);

    // If no prayers left today, calculate tomorrow's Fajr
    if (!foundNext && prayerTimes) {
      const tomorrowFajr = new Date(prayerTimes.fajr);
      tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
      targetTimeRef.current = tomorrowFajr;
      setNextPrayer(SALAHS.FAJR);
      setCurrentPrayer(SALAHS.ISHA); // It is currently Isha until Fajr
    }
  }, [prayers, prayerTimes]);

  // 3. The Timer Loop (Lightweight)
  useEffect(() => {
    // Initial calculation
    determineNextPrayer();

    const interval = setInterval(() => {
      if (!targetTimeRef.current) {
        // Fallback if target is missing
        determineNextPrayer();
        return;
      }

      const now = new Date();
      const diff = Math.floor((targetTimeRef.current.getTime() - now.getTime()) / 1000);

      if (diff <= 0) {
        // Target reached! Recalculate the next prayer
        determineNextPrayer();
      } else {
        // Just format the time
        const h = Math.floor(diff / 3600)
          .toString()
          .padStart(2, '0');
        const m = Math.floor((diff % 3600) / 60)
          .toString()
          .padStart(2, '0');
        const s = (diff % 60).toString().padStart(2, '0');
        setTimeLeft(`${h}:${m}:${s}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [determineNextPrayer]);

  // 4. Notification Scheduling
  const scheduleNotifications = useCallback(async () => {
    if (!prayerTimes || !prayerNotifications.isEnabled || !prayers.length) return;

    try {
      const hasPermission = await requestNotificationPermissions();
      if (!hasPermission) return;

      await cancelAllPrayerNotifications();

      const now = new Date();
      // Schedule only future prayers
      const futurePrayers = prayers.filter(p => p.time > now);

      await Promise.all(
        futurePrayers.map(p =>
          schedulePrayerNotificationWithOffset(p.name, p.time, prayerNotifications.minutesBefore)
        )
      );
    } catch (error) {
      console.error('Error scheduling prayer notifications:', error);
    }
  }, [prayerTimes, prayers, prayerNotifications]);

  // 5. Event Listener for Settings Updates
  useEffect(() => {
    scheduleNotifications();

    const subscription = DeviceEventEmitter.addListener(
      'prayer-notifications-updated',
      scheduleNotifications
    );

    return () => {
      subscription.remove();
    };
  }, [scheduleNotifications]);

  return { timeLeft, currentPrayer, nextPrayer };
};

export default useTimeLeft;
