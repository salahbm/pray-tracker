import { CheckCircle } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Pressable, Animated } from 'react-native';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { ThemesVariant, THEMES } from '@/styles/themes/theme.config';

const Themes = {
  light: {
    '--background': '#ffffff',
    '--foreground': '#1e1e1e',
    '--primary': '#3498db',
    '--accent': '#e74c3c',
    '--destructive': '#e74c3c',
  },
  dark: {
    '--background': '#000000',
    '--foreground': '#f5f5f5',
    '--primary': '#a7ff07',
    '--accent': '#7c83db',
    '--destructive': '#fb0f50',
  },
  forest_green: {
    '--background': '#1b3022',
    '--foreground': '#d9f8c4',
    '--primary': '#6fba1c',
    '--accent': '#8ccf68',
    '--destructive': '#ff5e5e',
  },
  ocean_breeze: {
    '--background': '#0e2439',
    '--foreground': '#e3f2fd',
    '--primary': '#0eaaff',
    '--accent': '#5dd4ff',
    '--destructive': '#f8676a',
  },
  sunset: {
    '--background': '#2e1a1a',
    '--foreground': '#fddbcf',
    '--primary': '#ff6347',
    '--accent': '#ffa07a',
    '--destructive': '#ff4500',
  },
  royal_purple: {
    '--background': '#1a0e2a',
    '--foreground': '#eae2fc',
    '--primary': '#6a1b9a',
    '--accent': '#b39ddb',
    '--destructive': '#e91e63',
  },
  golden_desert: {
    '--background': '#3e2f1b',
    '--foreground': '#f7e1ba',
    '--primary': '#ffcc80',
    '--accent': '#ffab40',
    '--destructive': '#f4511e',
  },
  emerald_green: {
    '--background': '#1b2e23',
    '--foreground': '#d6f6d6',
    '--primary': '#2e7d32',
    '--accent': '#689f38',
    '--destructive': '#d32f2f',
  },
};

const ThemeSwitcher = () => {
  const { currentTheme, changeTheme } = useThemeStore();
  const { t } = useTranslation();

  // Animated value for scaling effect
  const [scales] = useState(() =>
    Object.values(THEMES).reduce(
      (acc, theme) => {
        acc[theme] = new Animated.Value(1);
        return acc;
      },
      {} as Record<ThemesVariant, Animated.Value>,
    ),
  );

  const handlePress = (theme: ThemesVariant) => {
    // Trigger animation
    Animated.sequence([
      Animated.timing(scales[theme], {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scales[theme], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    changeTheme(theme);
  };

  return (
    <View className="flex flex-col items-center gap-2 p-4">
      {Object.values(THEMES).map((theme) => {
        const themeStyles = Themes[theme] || Themes[THEMES.light];
        const isActive = currentTheme === theme;

        return (
          <View
            key={theme}
            className={cn('flex-row w-full items-center justify-between')}
          >
            <View className="flex-row items-center gap-2">
              <CheckCircle
                color={themeStyles['--primary']}
                size={20}
                opacity={isActive ? 1 : 0}
              />
              <Text
                className={cn(
                  isActive ? 'font-bold  text-xl' : 'font-normal text-lg',
                )}
              >
                {t(`Defaults.Themes.${theme}`)}
              </Text>
            </View>
            <Pressable onPress={() => handlePress(theme)}>
              <Animated.View
                style={{
                  transform: [{ scale: scales[theme] }],
                  borderColor: themeStyles['--destructive'],
                  borderWidth: 1,
                  borderRadius: 5,
                  width: 100,
                  height: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: themeStyles['--primary'],
                  }}
                />
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: themeStyles['--background'],
                  }}
                />
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: themeStyles['--accent'],
                  }}
                />
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: themeStyles['--destructive'],
                  }}
                />
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: themeStyles['--foreground'],
                  }}
                />
              </Animated.View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

export default ThemeSwitcher;
