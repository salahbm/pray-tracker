import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Platform, Pressable, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { THEME_COLORS, THEMES, ThemesVariant } from '@/styles/theme.config';

const ThemeSwitcher = ({ onClose }: { onClose: () => void }) => {
  const { currentTheme, changeTheme } = useThemeStore();
  const { t } = useTranslation();

  // Animated value for scaling effect
  const [scales] = useState(() =>
    Object.values(THEMES).reduce(
      (acc, theme) => {
        acc[theme] = new Animated.Value(1);
        return acc;
      },
      {} as Record<ThemesVariant, Animated.Value>
    )
  );

  const handlePress = (theme: ThemesVariant) => {
    // Trigger animation
    Animated.sequence([
      Animated.timing(scales[theme], {
        toValue: 1.2,
        duration: 50,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(scales[theme], {
        toValue: 1,
        duration: 100,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();

    changeTheme(theme);
    onClose();
  };

  return (
    <View className="flex flex-col gap-3 pt-8 text-left">
      <Text className="font-bold text-xl mb-4">{t('profile.settings.theme')}</Text>
      {Object.values(THEMES).map(theme => {
        const themeStyles = THEME_COLORS[theme] || THEME_COLORS[THEMES.light];
        const isActive = currentTheme === theme;

        return (
          <Pressable
            onPress={() => handlePress(theme)}
            className={cn('flex-row w-full items-center justify-between')}
            key={theme}
          >
            <View className="flex-row items-center gap-1">
              <Text
                className={cn('text-md text-foreground', isActive ? 'font-bold' : 'font-normal ')}
              >
                {t(`common.themes.${theme}`)}
              </Text>
            </View>
            <Animated.View
              style={{
                transform: [{ scale: scales[theme] }],
                width: 100,
                height: 20,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0,
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
        );
      })}
    </View>
  );
};

export default ThemeSwitcher;
