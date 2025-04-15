import { CheckCircle } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Pressable, Animated, Platform } from 'react-native';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { ThemesVariant, THEMES, THEME_COLORS } from '@/styles/theme.config';

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
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(scales[theme], {
        toValue: 1,
        duration: 150,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();

    changeTheme(theme);
  };

  return (
    <View className="flex flex-col gap-2 pt-8 text-left">
      <Text className="font-bold text-xl mb-4">
        {t('Commons.Themes.Title')}
      </Text>
      {Object.values(THEMES).map((theme) => {
        const themeStyles = THEME_COLORS[theme] || THEME_COLORS[THEMES.light];
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
                {t(`Commons.Themes.${theme}`)}
              </Text>
            </View>
            <Pressable onPress={() => handlePress(theme)}>
              <Animated.View
                style={{
                  transform: [{ scale: scales[theme] }],
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
                    borderStartStartRadius: 4,
                    borderBottomLeftRadius: 4,
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
                    borderEndEndRadius: 4,
                    borderTopRightRadius: 4,
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
