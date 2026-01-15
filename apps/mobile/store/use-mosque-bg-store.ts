// CHecks onboarding visited or not
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageSourcePropType } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface MosqueBgState {
  bgIndex: number;
  setBgIndex: (i: number | ((p: number) => number)) => void;
}

export const useMosqueBgStore = create<MosqueBgState>()(
  persist(
    set => ({
      bgIndex: 0,
      setBgIndex: i =>
        set(state => ({
          bgIndex: typeof i === 'function' ? i(state.bgIndex) : i,
        })),
    }),
    {
      name: 'mosque-bg-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
