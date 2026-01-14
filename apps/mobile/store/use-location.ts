import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

interface LocationState {
  city: string;
  country: string;
  isLoadingLocation: boolean;
  locationError: string | null;
  setLocation: (city: string, country: string) => void;
  getCurrentLocation: () => Promise<void>;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      city: 'Mecca',
      country: 'Saudi Arabia',
      isLoadingLocation: false,
      locationError: null,

      setLocation: (city, country) => {
        set({
          city: city,
          country: country,
          locationError: null,
        });
      },

      getCurrentLocation: async () => {
        set({ isLoadingLocation: true, locationError: null });

        try {
          // Request permissions
          const { status } = await Location.requestForegroundPermissionsAsync();

          if (status !== 'granted') {
            set({
              isLoadingLocation: false,
              locationError: 'Location permission denied',
            });
            return;
          }

          // Get current position
          const position = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });

          // Use OpenStreetMap Nominatim API for reverse geocoding with English language
          // This ensures we always get English names regardless of device locale
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?` +
              `format=json&` +
              `lat=${position.coords.latitude}&` +
              `lon=${position.coords.longitude}&` +
              `accept-language=en&` + // Force English results
              `addressdetails=1`,
            {
              headers: {
                Accept: 'application/json',
                'User-Agent': 'NoorPrayTracker/1.0',
              },
            }
          );

          if (!response.ok) {
            throw new Error('Failed to reverse geocode location');
          }

          const data = await response.json();

          if (data && data.address) {
            // Extract city and country from the response
            const detectedCity =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.county ||
              data.address.state ||
              'Unknown';
            const detectedCountry = data.address.country || 'Unknown';

            // Names are already in English from API, but transliterate just in case
            const englishCity = detectedCity;
            const englishCountry = detectedCountry;

            set({
              city: englishCity,
              country: englishCountry,
              isLoadingLocation: false,
              locationError: null,
            });
          } else {
            set({
              isLoadingLocation: false,
              locationError: 'Could not determine location',
            });
          }
        } catch (error) {
          console.error('Location error:', error);
          set({
            isLoadingLocation: false,
            locationError: error instanceof Error ? error.message : 'Failed to get location',
          });
        }
      },
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Don't persist loading/error states
      partialize: state => ({
        city: state.city,
        country: state.country,
      }),
    }
  )
);
