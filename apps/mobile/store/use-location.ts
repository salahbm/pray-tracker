import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

interface LocationState {
  city: string | null;
  country: string | null;
  isLoadingLocation: boolean;
  locationError: string | null;
  initialized: boolean;
  setLocation: (city: string, country: string) => void;
  initLocation: () => Promise<void>;
  refreshLocation: () => Promise<void>;
  resetLocation: () => void;
}

const FALLBACK_CITY = 'Mecca';
const FALLBACK_COUNTRY = 'Saudi Arabia';

export const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      city: null,
      country: null,
      isLoadingLocation: false,
      locationError: null,
      initialized: false,

      setLocation: (city, country) => {
        set({ city, country, locationError: null });
      },

      initLocation: async () => {
        set({ isLoadingLocation: true });

        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') throw new Error('Location permission denied');

          const pos = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&accept-language=en&addressdetails=1`,
            {
              headers: {
                Accept: 'application/json',
                'User-Agent': 'NoorPrayTracker/1.0',
              },
            }
          );

          if (!res.ok) throw new Error('Reverse geocoding failed');

          const data = await res.json();
          if (!data?.address) throw new Error('Invalid geocoding response');

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county ||
            data.address.state;

          const country = data.address.country;

          if (!city || !country) throw new Error('Incomplete location data');

          set({
            city,
            country,
            initialized: true,
            isLoadingLocation: false,
          });
        } catch (err) {
          set({
            city: FALLBACK_CITY,
            country: FALLBACK_COUNTRY,
            locationError: err instanceof Error ? err.message : 'Location failed',
            initialized: true,
            isLoadingLocation: false,
          });
        }
      },

      refreshLocation: async () => {
        set({ initialized: false });
        await get().initLocation();
      },

      resetLocation: () => {
        set({
          city: null,
          country: null,
          initialized: false,
          isLoadingLocation: false,
          locationError: null,
        });
      },
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        city: state.city,
        country: state.country,
        initialized: state.initialized,
      }),
    }
  )
);
