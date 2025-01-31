import { PrayerTimes } from 'adhan';
import { useState, useEffect, useCallback } from 'react';

import { SALAHS } from '@/constants/enums';

const useTimeLeft = (prayerTimes) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [currentPrayer, setCurrentPrayer] = useState('');

  const updatePrayerStatus = useCallback(() => {
    if (!prayerTimes) return;

    const now = new Date();
    let current = '';
    let nextPrayerTime = null;

    const prayers = [
      { name: SALAHS.FAJR, time: prayerTimes.fajr },
      { name: SALAHS.SUNRISE, time: prayerTimes.sunrise },
      { name: SALAHS.DHUHR, time: prayerTimes.dhuhr },
      { name: SALAHS.ASR, time: prayerTimes.asr },
      { name: SALAHS.MAGHRIB, time: prayerTimes.maghrib },
      { name: SALAHS.ISHA, time: prayerTimes.isha },
    ];

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
  }, [prayerTimes]);

  useEffect(() => {
    updatePrayerStatus();
    const interval = setInterval(updatePrayerStatus, 1000);
    return () => clearInterval(interval);
  }, [updatePrayerStatus]);

  return { timeLeft, currentPrayer };
};

export default useTimeLeft;
