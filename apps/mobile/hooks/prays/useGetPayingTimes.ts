import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { PrayerTimesData } from '@/types/prayer-times';
import { useLocationStore } from '@/store/use-location';

const PRAYER_METHOD = 15;

const formatDate = (date: Date) => date.toISOString().split('T')[0];

const sanitizeTime = (time: string) => time.split(' ')[0];

const buildDateTime = (date: Date, time: string) => {
  const [hours, minutes] = sanitizeTime(time).split(':').map(Number);
  const next = new Date(date);
  next.setHours(hours ?? 0, minutes ?? 0, 0, 0);
  return next;
};

export const usePrayerData = () => {
  const { t } = useTranslation();
  const { city, country } = useLocationStore();
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [locationName, setLocationName] = useState(t('qibla.prayerTimes.location.fetching'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPrayerTimes = useCallback(async (selectedCity: string, selectedCountry: string) => {
    try {
      setLoading(true);
      setLocationName(`${selectedCity}, ${selectedCountry}`);

      const date = new Date();
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity/${formatDate(
          date
        )}?city=${encodeURIComponent(selectedCity)}&country=${encodeURIComponent(
          selectedCountry
        )}&method=${PRAYER_METHOD}`
      );
      const json = await response.json();
      const timings = json?.data?.timings;

      if (!timings) {
        throw new Error('No timings returned');
      }

      const times: PrayerTimesData = {
        fajr: buildDateTime(date, timings.Fajr),
        sunrise: buildDateTime(date, timings.Sunrise),
        dhuhr: buildDateTime(date, timings.Dhuhr),
        asr: buildDateTime(date, timings.Asr),
        maghrib: buildDateTime(date, timings.Maghrib),
        isha: buildDateTime(date, timings.Isha),
      };

      setPrayerTimes(times);
      setError(false);
    } catch (err) {
      console.error('Prayer times fetch error:', err);
      setError(true);
      setPrayerTimes(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!city || !country) {
      setLoading(false);
      return;
    }

    void fetchPrayerTimes(city, country);
  }, [city, country, fetchPrayerTimes]);

  return {
    prayerTimes,
    locationName,
    loading,
    error,
  };
};
