import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { THEMES, ThemesVariant } from '@/styles/themes/theme.config';

interface ThemeState {
  currentTheme: ThemesVariant;
  changeTheme: (theme: ThemesVariant) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist<ThemeState>(
    (set) => ({
      currentTheme: THEMES.light, // Default theme
      changeTheme: (theme) => set({ currentTheme: theme }),
    }),
    {
      name: 'theme-store', // Key for persistence
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
