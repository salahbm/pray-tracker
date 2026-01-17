import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/text';
import { useThemeStore } from '@/store/defaults/theme';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { IMAGES } from '@/constants/images';
import { useTranslation } from 'react-i18next';

export const SpalshScreen = ({ onAnimationFinish }: { onAnimationFinish: () => void }) => {
  const { t } = useTranslation('common.splash');
  const insets = useSafeAreaInsets();
  const { currentTheme } = useThemeStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationFinish();
    }, 2000); // match this with your animation duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-background">
      {/* Main Content Wrapper */}
      <View style={styles.content}>
        {/* Center Group: Logo + App Name */}
        <View className="items-center justify-center">
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 55 }}
            className="shadow-2xl drop-shadow-xl overflow-hidden rounded-3xl"
          >
            <Image
              source={currentTheme === 'light' ? IMAGES.icon_light : IMAGES.icon_dark}
              style={styles.logo}
              resizeMode="contain"
            />
          </MotiView>

          {/* Noor Text - Now relative to the logo */}
          <View className="flex-row mt-6">
            {'Noor'.split('').map((letter, index) => (
              <Animated.Text
                key={index}
                className="text-5xl font-black text-foreground tracking-tighter shadow-2xl drop-shadow-xl"
                entering={FadeInRight.delay(600 + index * 100).duration(400)}
              >
                {letter}
              </Animated.Text>
            ))}
          </View>
        </View>

        {/* Footer: Positioned absolutely at the bottom */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', delay: 1200 }}
          style={[styles.footer, { bottom: insets.bottom + 40 }]}
        >
          <Text className="text-center text-sm text-foreground/60 font-bold uppercase tracking-[4px]">
            {t('elevate_your_salah', 'Elevate your Salah')}
          </Text>
        </MotiView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Keeps everything in the dead center
  },
  logo: {
    width: 220,
    height: 220,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 2,
  },
  footer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
});
