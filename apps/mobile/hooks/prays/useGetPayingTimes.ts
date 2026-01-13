import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

export const usePrayerData = () => {
  const { t } = useTranslation();
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [locationName, setLocationName] = useState(t('qibla.prayerTimes.location.fetching'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchLocationAndPrayers = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(t('qibla.prayerTimes.errors.title'), t('qibla.prayerTimes.errors.message'));
          if (mounted) {
            setError(true);
            setLoading(false);
          }
          return;
        }

        const userLocation = await Location.getCurrentPositionAsync({});
        const coordinates = new Coordinates(
          userLocation.coords.latitude,
          userLocation.coords.longitude
        );

        // Calculate Times
        const params = CalculationMethod.MoonsightingCommittee();
        const date = new Date();
        const times = new PrayerTimes(coordinates, date, params);

        // Get City Name
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        });

        if (mounted) {
          setPrayerTimes(times);

          if (reverseGeocode.length > 0) {
            const { city, region, country } = reverseGeocode[0];
            const unknown = t('qibla.prayerTimes.location.unknown');
            setLocationName(`${city || unknown}, ${region || unknown}, ${country || unknown}`);
          }
        }
      } catch (err) {
        if (mounted) setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchLocationAndPrayers();

    return () => {
      mounted = false;
    };
  }, []); // Removed [t] to prevent refetching on language change only

  return { prayerTimes, locationName, loading, error };
};
