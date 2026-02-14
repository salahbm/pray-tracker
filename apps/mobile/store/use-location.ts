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
  setInitialized: (value: boolean) => void;
  resetLocation: () => void;
}

const FALLBACK_CITY = 'Mecca';
const FALLBACK_COUNTRY = 'Saudi Arabia';
const LOCATION_TIMEOUT_MS = 12000;

export const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      city: null,
      country: null,
      isLoadingLocation: false,
      locationError: null,
      initialized: false,

      setLocation: (city, country) => {
        set({ city, country, locationError: null, initialized: true, isLoadingLocation: false });
      },

      initLocation: async () => {
        set({ isLoadingLocation: true });

        try {
          // Check existing permission first
          const existingPermission = await Location.getForegroundPermissionsAsync();
          const { status } =
            existingPermission.status === 'granted'
              ? existingPermission
              : await Location.requestForegroundPermissionsAsync();

          if (status !== 'granted') {
            // Set fallback location when permission is denied
            set({
              city: FALLBACK_CITY,
              country: FALLBACK_COUNTRY,
              initialized: true,
              isLoadingLocation: false,
              locationError: null,
            });
            return;
          }

          const lastKnown = await Location.getLastKnownPositionAsync({
            maxAge: 1000 * 60 * 10,
            requiredAccuracy: 1000,
          });
          const pos =
            lastKnown ??
            (await Promise.race([
              Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
              }),
              new Promise<never>((_, reject) => {
                setTimeout(() => reject(new Error('Location timeout')), LOCATION_TIMEOUT_MS);
              }),
            ]));

          const geocoded = await Location.reverseGeocodeAsync({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          const first = geocoded[0];
          const city = first?.city || first?.subregion || first?.region || first?.district;
          const country = first?.country;

          if (!city || !country) {
            set({
              city: FALLBACK_CITY,
              country: FALLBACK_COUNTRY,
              locationError: 'Incomplete location data',
              initialized: true,
              isLoadingLocation: false,
            });
            return;
          }

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

      setInitialized: value => {
        set({ initialized: value });
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
