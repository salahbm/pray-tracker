// CHecks onboarding visited or not
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageSourcePropType } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface MosqueBgState {
  url: ImageSourcePropType;
  setUrl: (url: ImageSourcePropType) => void;
}

export const useMosqueBgStore = create<MosqueBgState>()(
  persist<MosqueBgState>(
    set => ({
      url: require('@/assets/mosque/mosque-1.jpg'),
      setUrl: (url: ImageSourcePropType) => set({ url }),
    }),
    {
      name: 'mosque-bg-store', // Key for persistence
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage'
    }
  )
);
