import { MotiView } from 'moti';
import { View } from 'react-native';

import { Text } from '@/components/ui/text';

interface OnboardingFeedbackCardProps {
  title?: string;
  body?: string;
}

export const OnboardingFeedbackCard = ({ title, body }: OnboardingFeedbackCardProps) => {
  if (!title && !body) {
    return null;
  }

  return (
    <MotiView
      from={{ opacity: 0, translateY: 8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 220 }}
      className="mt-5 rounded-2xl border border-border bg-background/80 p-4"
    >
      {title && <Text className="text-base font-semibold text-foreground">{title}</Text>}
      {body && <Text className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</Text>}
    </MotiView>
  );
};
