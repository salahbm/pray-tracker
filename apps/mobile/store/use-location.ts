import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LocationState {
  city: string;
  country: string;
  setLocation: (city: string, country: string) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    set => ({
      city: 'Mecca',
      country: 'Saudi Arabia',
      setLocation: (city, country) => set({ city, country }),
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
