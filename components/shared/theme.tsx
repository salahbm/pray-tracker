import { MoonStar, Sun } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Pressable, Animated } from 'react-native';

import { Text } from '../ui/text';
import { useColorScheme } from '@/hooks/common/useColorScheme';
import { cn } from 'lib/utils';

const ThemeSwitcher = () => {
  const { toggleColorScheme, isDarkColorScheme } = useColorScheme();
  const { t } = useTranslation();

  // Animated value for scaling effect
  const [scale] = useState(new Animated.Value(1));

  const handlePress = () => {
    // Trigger animation
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Toggle the theme
    toggleColorScheme();
  };

  return (
    <View className="flex-row items-center gap-2">
      <Text>
        {isDarkColorScheme
          ? t('Defaults.Theme.dark')
          : t('Defaults.Theme.light')}
      </Text>

      {/* Dark Mode Button */}
      <Pressable
        onPress={handlePress}
        className={cn(isDarkColorScheme ? 'hidden' : 'block')}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <MoonStar color="gray" />
        </Animated.View>
      </Pressable>

      {/* Light Mode Button */}
      <Pressable
        onPress={handlePress}
        className={cn(isDarkColorScheme ? 'block' : 'hidden')}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <Sun />
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default ThemeSwitcher;
