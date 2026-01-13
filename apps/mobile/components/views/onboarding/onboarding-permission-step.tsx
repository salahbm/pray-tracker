import { MotiView } from 'moti';
import { ScrollView, View } from 'react-native';

import { Text } from '@/components/ui/text';
import Image from '@/components/ui/image';

interface OnboardingPermissionStepProps {
  headline: string;
  body: string;
  benefits: string[];
  illustration?: number | string;
}

export const OnboardingPermissionStep = ({
  headline,
  body,
  benefits,
  illustration,
}: OnboardingPermissionStepProps) => {
  return (
    <ScrollView className="flex-1" contentContainerClassName="pb-6">
      <MotiView
        from={{ opacity: 0, translateY: 12 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 18, stiffness: 160 }}
        className="items-center mt-4"
      >
        <Image source={illustration} size="lg" radius="lg" border="no" className="w-24 h-24" />
      </MotiView>
      <View className="mt-6">
        <Text className="text-3xl font-semibold text-foreground mb-3">{headline}</Text>
        <Text className="text-base text-muted-foreground leading-relaxed">{body}</Text>
      </View>
      <View className="mt-6">
        {benefits.map(benefit => (
          <View key={benefit} className="flex-row items-start mb-3">
            <View className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
            <Text className="ml-3 text-base text-foreground flex-1">{benefit}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
