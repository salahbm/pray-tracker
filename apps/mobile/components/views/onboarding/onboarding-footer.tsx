import { StyleProp, View, ViewStyle } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface OnboardingFooterProps {
  primaryLabel: string;
  onPrimary: () => void;
  primaryDisabled?: boolean;
  isLoading?: boolean;
  containerClassName?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const OnboardingFooter = ({
  primaryLabel,
  onPrimary,
  primaryDisabled = false,
  isLoading = false,
  containerClassName,
  containerStyle,
}: OnboardingFooterProps) => {
  return (
    <View className={cn('pt-6', containerClassName)} style={containerStyle}>
      <Button
        onPress={onPrimary}
        disabled={primaryDisabled || isLoading}
        className="rounded-full"
        width="full"
        size="lg"
      >
        <Text>{primaryLabel}</Text>
      </Button>
    </View>
  );
};
