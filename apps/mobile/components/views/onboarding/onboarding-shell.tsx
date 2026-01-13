import { ReactNode } from 'react';
import { View } from 'react-native';
import { cn } from '@/lib/utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { OnboardingProgress } from './onboarding-progress';
import { PressableBounce } from '@/components/shared/pressable-bounce';
import { ArrowLeft } from '@/components/shared/icons';

interface OnboardingShellProps {
  children: ReactNode;
  stepIndex: number;
  totalSteps: number;
  onBack?: () => void;
  hideHeader?: boolean;
  hideProgress?: boolean;
  contentClassName?: string;
}

export const OnboardingShell = ({
  children,
  stepIndex,
  totalSteps,
  onBack,
  hideHeader = false,
  hideProgress = false,
  contentClassName,
}: OnboardingShellProps) => {
  const insets = useSafeAreaInsets();
  const progress = totalSteps > 0 ? (stepIndex + 1) / totalSteps : 0;

  return (
    <View
      className="flex-1 bg-background"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {!hideHeader && (
        <View className="px-4 pt-4">
          {!hideProgress && <OnboardingProgress progress={progress} />}

          <PressableBounce
            onPress={onBack}
            className={cn(
              'rounded-full mt-2 border-2 border-primary h-12 w-12 flex items-center justify-center',
              !onBack && 'opacity-0'
            )}
            disabled={!onBack}
            hitSlop={10}
          >
            <ArrowLeft size={24} className="text-primary stroke-2" />
          </PressableBounce>
        </View>
      )}
      <View className={cn('flex-1 px-4 pb-6', contentClassName)}>{children}</View>
    </View>
  );
};
