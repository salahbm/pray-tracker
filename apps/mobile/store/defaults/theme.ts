import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { THEME_COLORS, ThemeColors, THEMES, ThemesVariant } from '@/styles/theme.config';

// Define the ThemeState interface
interface ThemeState {
  currentTheme: ThemesVariant;
  changeTheme: (theme: ThemesVariant) => void;
  colors: ThemeColors;
}

// Create the zustand store with persistence
export const useThemeStore = create<ThemeState>()(
  persist<ThemeState>(
    set => ({
      currentTheme: THEMES.light, // Default theme
      colors: THEME_COLORS[THEMES.light],
      changeTheme: theme => set({ currentTheme: theme, colors: THEME_COLORS[theme] }),
    }),
    {
      name: 'theme-store', // Key for persistence
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
