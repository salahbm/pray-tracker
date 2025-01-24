import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { THEME_COLORS, THEMES, ThemesVariant } from '@/styles/theme.config';

// Define the ThemeState interface
interface ThemeState {
  currentTheme: ThemesVariant;
  changeTheme: (theme: ThemesVariant) => void;
}

// Create the zustand store with persistence
export const useThemeStore = create<ThemeState>()(
  persist<ThemeState>(
    (set) => ({
      currentTheme: THEMES.light, // Default theme
      COLORS: THEME_COLORS[THEMES.light],
      changeTheme: (theme) => set({ currentTheme: theme }),
    }),
    {
      name: 'theme-store', // Key for persistence
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

// Dynamic access to the current COLORS
