import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { PrayerTimesData } from '@/types/prayer-times';

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
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [locationName, setLocationName] = useState(t('qibla.prayerTimes.location.fetching'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [city, setCity] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  const resolveLocation = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t('qibla.prayerTimes.errors.title'), t('qibla.prayerTimes.errors.message'));
      setLocationName(t('qibla.prayerTimes.location.unknown'));
      setLoading(false);
      return;
    }

    const userLocation = await Location.getCurrentPositionAsync({});
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
    });

    if (reverseGeocode.length > 0) {
      const fallbackUnknown = t('qibla.prayerTimes.location.unknown');
      const locationCity = reverseGeocode[0].city || reverseGeocode[0].region || fallbackUnknown;
      const locationCountry = reverseGeocode[0].country || fallbackUnknown;
      setCity(locationCity);
      setCountry(locationCountry);
      setLocationName(`${locationCity}, ${locationCountry}`);
    } else {
      setLocationName(t('qibla.prayerTimes.location.unknown'));
    }
  }, [t]);

  const fetchPrayerTimes = useCallback(async (selectedCity: string, selectedCountry: string) => {
    try {
      setLoading(true);
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
      setLocationName(`${selectedCity}, ${selectedCountry}`);
      setError(false);
    } catch (err) {
      setError(true);
      setPrayerTimes(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    resolveLocation().catch(() => {
      if (mounted) {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [resolveLocation]);

  useEffect(() => {
    if (!city || !country) {
      return;
    }

    void fetchPrayerTimes(city, country);
  }, [city, country, fetchPrayerTimes]);

  return {
    prayerTimes,
    locationName,
    loading,
    error,
    city,
    country,
    setCity,
    setCountry,
  };
};
