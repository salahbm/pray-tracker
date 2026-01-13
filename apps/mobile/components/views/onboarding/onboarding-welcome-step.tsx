import LottieView from 'lottie-react-native';
import { MotiView } from 'moti';
import { View } from 'react-native';

import { Text } from '@/components/ui/text';

interface OnboardingWelcomeStepProps {
  headline: string;
  body: string;
  footnote?: string;
  lottieSource: string;
}

export const OnboardingWelcomeStep = ({
  headline,
  body,
  footnote,
  lottieSource,
}: OnboardingWelcomeStepProps) => {
  return (
    <View className="flex-1 justify-center">
      <MotiView
        from={{ opacity: 0, translateY: 12 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 18, stiffness: 140 }}
        className="items-center"
      >
        <LottieView source={lottieSource} autoPlay loop style={{ width: '100%', height: 320 }} />
        <Text className="mt-6 text-3xl font-semibold text-foreground text-center">{headline}</Text>
        <Text className="mt-4 text-center text-base text-muted-foreground leading-relaxed">
          {body}
        </Text>
        {footnote && (
          <Text className="mt-3 text-center text-sm text-muted-foreground">{footnote}</Text>
        )}
      </MotiView>
    </View>
  );
};
