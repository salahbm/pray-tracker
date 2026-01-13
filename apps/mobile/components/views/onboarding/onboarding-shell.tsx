import { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

import { OnboardingProgress } from './onboarding-progress';

interface OnboardingShellProps {
  children: ReactNode;
  stepIndex: number;
  totalSteps: number;
  onBack?: () => void;
  onSkip?: () => void;
  backLabel?: string;
  skipLabel?: string;
  hideHeader?: boolean;
  hideProgress?: boolean;
  contentClassName?: string;
}

export const OnboardingShell = ({
  children,
  stepIndex,
  totalSteps,
  onBack,
  onSkip,
  backLabel = 'Back',
  skipLabel = 'Skip',
  hideHeader = false,
  hideProgress = false,
  contentClassName,
}: OnboardingShellProps) => {
  const progress = totalSteps > 0 ? (stepIndex + 1) / totalSteps : 0;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
      {!hideHeader && (
        <View className="px-5 pt-4">
          <View className="flex-row items-center justify-between">
            <Pressable
              onPress={onBack}
              className={cn('py-2 pr-4', !onBack && 'opacity-0')}
              disabled={!onBack}
            >
              <Text className="text-sm text-muted-foreground">{backLabel}</Text>
            </Pressable>
            <Pressable
              onPress={onSkip}
              className={cn('py-2 pl-4', !onSkip && 'opacity-0')}
              disabled={!onSkip}
            >
              <Text className="text-sm text-muted-foreground">{skipLabel}</Text>
            </Pressable>
          </View>
          {!hideProgress && (
            <View className="mt-4">
              <OnboardingProgress progress={progress} />
            </View>
          )}
        </View>
      )}
      <View className={cn('flex-1 px-5 pb-6', contentClassName)}>{children}</View>
    </SafeAreaView>
  );
};
