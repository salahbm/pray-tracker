import LottieView, { LottieViewProps } from 'lottie-react-native';
import { MotiView } from 'moti';
import { ScrollView, View } from 'react-native';

import { Text } from '@/components/ui/text';

interface OnboardingFinalStepProps {
  headline: string;
  body: string;
  socialProof?: string;
  lottieSource: LottieViewProps['source'];
}

export const OnboardingFinalStep = ({
  headline,
  body,
  socialProof,
  lottieSource,
}: OnboardingFinalStepProps) => {
  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="pb-6"
      showsVerticalScrollIndicator={false}
    >
      <MotiView
        from={{ opacity: 0, translateY: 12 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 18, stiffness: 160 }}
        className="items-center mt-6"
      >
        <LottieView source={lottieSource} autoPlay loop style={{ width: '100%', height: 320 }} />
        <Text className="mt-6 text-3xl font-semibold text-foreground text-center">{headline}</Text>
        <Text className="mt-4 text-center text-base text-muted-foreground leading-relaxed">
          {body}
        </Text>
        {socialProof && (
          <View className="mt-6 rounded-full border border-border px-4 py-2">
            <Text className="text-sm text-primary">{socialProof}</Text>
          </View>
        )}
      </MotiView>
    </ScrollView>
  );
};
