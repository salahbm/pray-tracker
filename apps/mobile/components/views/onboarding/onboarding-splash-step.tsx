import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { View } from 'react-native';

import { Text } from '@/components/ui/text';
import { useThemeStore } from '@/store/defaults/theme';

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
  const { colors } = useThemeStore();

  return (
    <LinearGradient
      colors={[colors['--primary'], colors['--accent']]}
      className="flex-1 items-center justify-center rounded-3xl"
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 0.9, y: 1 }}
    >
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 500 }}
        className="items-center px-6"
      >
        {badge && (
          <View className="mb-4 rounded-full bg-white/20 px-4 py-2">
            <Text className="text-sm font-semibold text-white">{badge}</Text>
          </View>
        )}
        <Text className="text-3xl font-bold text-white text-center">{headline}</Text>
        <Text className="mt-3 text-center text-base text-white/90 leading-relaxed">
          {subheadline}
        </Text>
      </MotiView>
    </LinearGradient>
  );
};
