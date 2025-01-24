import { useThemeStore } from '@/store/defaults/theme';
import { THEME_COLORS } from '@/styles/theme.config';

export const useCurrentThemeColors = () => {
  const { currentTheme } = useThemeStore();

  // Automatically infer the type of colors
  const colors = THEME_COLORS[currentTheme];
  return colors;
};
