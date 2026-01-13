import LottieView from 'lottie-react-native';
import { MotiView } from 'moti';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface OnboardingWelcomeStepProps {
  headline: string;
  body: string;
  footnote?: string;
  lottieSource: unknown;
  settings?: {
    languageLabel: string;
    onLanguagePress: () => void;
    onThemePress: () => void;
    themeColors: string[];
  };
}

export const OnboardingWelcomeStep = ({
  headline,
  body,
  footnote,
  lottieSource,
  settings,
}: OnboardingWelcomeStepProps) => {
  return (
    <View className="flex-1 justify-center">
      <MotiView
        from={{ opacity: 0, translateY: 12 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 18, stiffness: 140 }}
        className="items-center"
      >
        {settings && (
          <View className="w-full flex-row items-center justify-between mb-4">
            <Pressable
              onPress={settings.onLanguagePress}
              className="rounded-full border border-border px-4 py-2"
            >
              <Text className="text-sm text-muted-foreground">{settings.languageLabel}</Text>
            </Pressable>
            <Pressable onPress={settings.onThemePress} className="flex-row items-center">
              {settings.themeColors.map((color, index) => (
                <View
                  key={`${color}-${index}`}
                  className={cn(
                    'h-5 w-5 border border-border',
                    index === 0 && 'rounded-l-md',
                    index === settings.themeColors.length - 1 && 'rounded-r-md'
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </Pressable>
          </View>
        )}
        <LottieView source={lottieSource} autoPlay loop style={{ width: 240, height: 240 }} />
        <Text className="mt-6 text-3xl font-semibold text-foreground text-center">
          {headline}
        </Text>
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
