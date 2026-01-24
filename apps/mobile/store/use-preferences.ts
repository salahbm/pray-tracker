import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface PreferencesState {
  showHistoryDay: boolean;
  setShowHistoryDay: (i: boolean) => void;
  prayerCalculationMethod: number;
  setPrayerCalculationMethod: (method: number) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    set => ({
      showHistoryDay: true,
      setShowHistoryDay: i => set({ showHistoryDay: i }),
      prayerCalculationMethod: 1, // Default: Muslim World League
      setPrayerCalculationMethod: method => set({ prayerCalculationMethod: method }),
    }),
    {
      name: 'preferences-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
