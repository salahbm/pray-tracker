import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PrayerTimesData } from '@/types/prayer-times';
import { useLocationStore } from '@/store/use-location';
import * as Location from 'expo-location';

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
  const { city, country, initLocation, initialized, isLoadingLocation, setInitialized } =
    useLocationStore();
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [locationName, setLocationName] = useState(t('qibla.prayerTimes.location.fetching'));
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  const fetchPrayerTimes = useCallback(async (selectedCity: string, selectedCountry: string) => {
    try {
      setIsFetching(true);
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
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    if (!initialized) {
      const bootstrapLocation = async () => {
        const permission = await Location.getForegroundPermissionsAsync();
        if (permission.status === 'granted') {
          // Initialize location - this will set city/country in store
          await initLocation();
        } else {
          // No permission - initLocation will set Mecca as fallback
          await initLocation();
        }
      };

      void bootstrapLocation();
      return;
    }

    // Wait for location store to be initialized
    if (!city || !country) {
      return;
    }

    // Fetch prayer times for the actual location (could be user's location or Mecca fallback)
    setLocationName(`${city}, ${country}`);
    void fetchPrayerTimes(city, country);
  }, [city, country, fetchPrayerTimes, initLocation, initialized]);

  const loading = useMemo(() => {
    if (!initialized || isLoadingLocation) return true;
    return isFetching;
  }, [initialized, isFetching, isLoadingLocation]);

  return {
    prayerTimes,
    locationName,
    loading,
    error,
  };
};
