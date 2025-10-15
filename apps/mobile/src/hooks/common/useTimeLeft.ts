import { PrayerTimes } from 'adhan';
import * as Notifications from 'expo-notifications';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { SALAHS } from '@/constants/enums';
import { scheduleNextPrayerNotification } from '@/utils/notification';

const useTimeLeft = (prayerTimes) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [currentPrayer, setCurrentPrayer] = useState('');
  const { t } = useTranslation();

  const prayers = useMemo(
    () => [
      { name: SALAHS.FAJR, time: prayerTimes?.fajr },
      { name: SALAHS.SUNRISE, time: prayerTimes?.sunrise },
      { name: SALAHS.DHUHR, time: prayerTimes?.dhuhr },
      { name: SALAHS.ASR, time: prayerTimes?.asr },
      { name: SALAHS.MAGHRIB, time: prayerTimes?.maghrib },
      { name: SALAHS.ISHA, time: prayerTimes?.isha },
    ],
    [prayerTimes],
  );

  const updatePrayerStatus = useCallback(() => {
    if (!prayerTimes) return;

    const now = new Date();
    let current = '';
    let nextPrayerTime = null;

    for (let i = 0; i < prayers.length; i++) {
      if (now >= prayers[i].time) {
        current = prayers[i].name;
      }
      if (now < prayers[i].time && !nextPrayerTime) {
        nextPrayerTime = prayers[i].time;
      }
    }

    if (!nextPrayerTime) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      nextPrayerTime = new PrayerTimes(
        prayerTimes.coordinates,
        tomorrow,
        prayerTimes.calculationParameters,
      ).fajr;
    }

    const diff = Math.max(
      0,
      Math.floor((nextPrayerTime - now.getTime()) / 1000),
    );

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

  // 📆 Schedule local notifications once on load
  useEffect(() => {
    if (!prayerTimes) return;

    // Cancel all existing notifications first
    const cleanup = async () => {
      await Notifications.cancelAllScheduledNotificationsAsync();
    };

    // Schedule new notifications
    const scheduleNotifications = async () => {
      await cleanup();

      for (const { name, time } of prayers) {
        if (time > new Date()) {
          await scheduleNextPrayerNotification(
            t(`Commons.Salahs.${name}`),
            t('Commons.Notifications.Description', {
              salah: name.toLocaleUpperCase(),
            }),
            time,
          );
        }
      }
    };

    scheduleNotifications();

    // Cleanup when component unmounts or prayerTimes changes
    return () => {
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prayerTimes]); // Only depend on prayerTimes, not prayers or t

  return { timeLeft, currentPrayer };
};

export default useTimeLeft;
