import BottomSheet from '@gorhom/bottom-sheet';
import { RefObject } from 'react';
import { View } from 'react-native';

import CustomBottomSheet from '@/components/shared/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

interface OnboardingModalProps {
  sheetRef: RefObject<BottomSheet | null>;
  headline: string;
  body: string;
  bullets?: string[];
  primaryCta?: string;
  secondaryCta?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
}

export const OnboardingModal = ({
  sheetRef,
  headline,
  body,
  bullets,
  primaryCta,
  secondaryCta,
  onPrimary,
  onSecondary,
}: OnboardingModalProps) => {
  return (
    <CustomBottomSheet sheetRef={sheetRef} snapPoints={['45%']}>
      <View className="px-5 pb-8">
        <Text className="text-2xl font-semibold text-foreground mb-3">{headline}</Text>
        <Text className="text-base text-muted-foreground leading-relaxed">{body}</Text>
        {bullets && bullets.length > 0 && (
          <View className="mt-5">
            {bullets.map(bullet => (
              <View key={bullet} className="flex-row items-start mb-3">
                <View className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                <Text className="ml-3 text-base text-foreground flex-1">{bullet}</Text>
              </View>
            ))}
          </View>
        )}
        <View className="mt-6 gap-3">
          {primaryCta && onPrimary && (
            <Button onPress={onPrimary} className="rounded-full" width="full">
              <Text>{primaryCta}</Text>
            </Button>
          )}
          {secondaryCta && onSecondary && (
            <Button onPress={onSecondary} variant="ghost" width="full">
              <Text className="text-muted-foreground">{secondaryCta}</Text>
            </Button>
          )}
        </View>
      </View>
    </CustomBottomSheet>
  );
};
