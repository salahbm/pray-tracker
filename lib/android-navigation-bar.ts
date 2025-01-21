import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';

import { COLORS } from '@/constants/Colors';

export async function setAndroidNavigationBar(theme: 'light' | 'dark') {
  if (Platform.OS !== 'android') return;
  await NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark');
  await NavigationBar.setBackgroundColorAsync(
    theme === 'dark' ? COLORS.dark.background : COLORS.light.background,
  );
}
