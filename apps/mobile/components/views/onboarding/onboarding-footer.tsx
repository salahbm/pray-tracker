import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface OnboardingFooterProps {
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  primaryDisabled?: boolean;
  isLoading?: boolean;
  containerClassName?: string;
}

export const OnboardingFooter = ({
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  primaryDisabled = false,
  isLoading = false,
  containerClassName,
}: OnboardingFooterProps) => {
  return (
    <View className={cn('pt-6 gap-3', containerClassName)}>
      <Button
        onPress={onPrimary}
        disabled={primaryDisabled || isLoading}
        className="rounded-full"
        width="full"
      >
        <Text>{primaryLabel}</Text>
      </Button>
      {secondaryLabel && onSecondary && (
        <Button onPress={onSecondary} variant="ghost" width="full">
          <Text className="text-muted-foreground">{secondaryLabel}</Text>
        </Button>
      )}
    </View>
  );
};
