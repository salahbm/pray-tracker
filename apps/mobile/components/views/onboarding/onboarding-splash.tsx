import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { View } from 'react-native';

import { Text } from '@/components/ui/text';
import { useThemeStore } from '@/store/defaults/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { useOnboarding } from '@/store/defaults/onboarding';

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
  const { setVisited } = useOnboarding();

  useEffect(() => {
    setTimeout(() => {
      setVisited(true);
      router.replace('/(tabs)');
    }, 1600);
  }, [setVisited]);

  return (
    <LinearGradient
      colors={[colors['--primary-300'], colors['--primary-700']]}
      className="flex-1 items-center justify-center rounded-3xl"
      style={{ paddingTop: insets.top + 30, paddingBottom: insets.bottom + 40 }}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 0.9, y: 1 }}
    >
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          type: 'timing',
          duration: 1500,
        }}
        className="items-center px-6 h-full flex flex-col justify-between"
      >
        <View />
        <View>
          <Text className="text-6xl font-extrabold text-white text-center">{headline}</Text>
          {badge && (
            <View className="mt-4 rounded-full bg-white/20 px-4 py-2">
              <Text className=" text-3xl font-semibold text-white">pray tracker</Text>
            </View>
          )}
        </View>
        <Text className="mt-3 text-center text-xl text-white/90 leading-relaxed">
          {subheadline}
        </Text>
      </MotiView>
    </LinearGradient>
  );
};
