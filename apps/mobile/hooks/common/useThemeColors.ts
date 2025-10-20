// hooks/useThemeColors.ts
import { useColorScheme } from 'nativewind';
import { THEME_COLORS } from '@/styles/theme.config';
import type { ThemeColors } from '@/styles/theme.config';

export const useThemeColors = (): ThemeColors => {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme ?? 'light'; // fallback
  return THEME_COLORS[theme];
};
