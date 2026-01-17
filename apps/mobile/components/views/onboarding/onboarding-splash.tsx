import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/text';
import { useThemeStore } from '@/store/defaults/theme';
import { useOnboardingStore } from '@/store/defaults/onboarding';

interface OnboardingSplashStepProps {
  headline: string;
  subheadline: string;
  badge?: string;
}

export const OnboardingSplashStep = ({
  headline,
  subheadline,
  badge,
}: OnboardingSplashStepProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useThemeStore();
  const { setVisited } = useOnboardingStore();

  // Ensure we have fallback colors in case the store is undefined
  const primaryColor = colors?.['--primary'] || '#000000';
  const secondaryColor = colors?.['--primary-700'] || '#1a1a1a';

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisited(true);
      router.replace('/(tabs)');
    }, 2000);
    return () => clearTimeout(timer);
  }, [setVisited]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[primaryColor, secondaryColor]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + 40,
          paddingBottom: insets.bottom + 50,
          paddingHorizontal: 24,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Top Spacer */}
        <View />

        {/* Center Content */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 1000 }}
          style={{ alignItems: 'center', width: '100%' }}
        >
          <Text className="text-5xl font-black text-white text-center">{headline}</Text>

          {badge && (
            <View className="mt-6 rounded-2xl bg-white/20 px-6 py-3 border border-white/10">
              <Text className="text-xl font-bold text-white uppercase tracking-widest">
                {badge}
              </Text>
            </View>
          )}
        </MotiView>

        {/* Bottom Content */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', delay: 500 }}
        >
          <Text className="text-center text-lg text-white/80 font-medium">{subheadline}</Text>
        </MotiView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fallback
  },
});
