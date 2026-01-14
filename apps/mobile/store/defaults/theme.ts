import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { THEME_COLORS, ThemeColors, THEMES, ThemesVariant } from '@/styles/theme.config';
import { mapThemeToRNColors } from '@/lib/utils';

// Define the ThemeState interface
interface ThemeState {
  currentTheme: ThemesVariant;
  changeTheme: (theme: ThemesVariant) => void;
  colors: ThemeColors;
}

export const useThemeStore = create<ThemeState>()(
  persist<ThemeState>(
    set => ({
      currentTheme: THEMES.light,
      colors: mapThemeToRNColors(THEME_COLORS[THEMES.light]),
      changeTheme: theme =>
        set({
          currentTheme: theme,
          colors: mapThemeToRNColors(THEME_COLORS[theme]),
        }),
    }),
    {
      name: 'theme-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
