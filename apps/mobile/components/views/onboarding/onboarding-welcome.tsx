import LottieView from 'lottie-react-native';
import { MotiView } from 'moti';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { gifs } from '@/constants/images';
import { useThemeStore } from '@/store/defaults/theme';
import { useLanguage } from '@/hooks/common/useTranslation';
import { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { FLAGS, Language, LANGUAGES } from '@/components/shared/language';
import CustomBottomSheet from '@/components/shared/bottom-sheet';
import ThemeSwitcher from '@/components/shared/theme-switcher';

interface OnboardingWelcomeStepProps {
  headline: string;
  body: string;
  footnote?: string;
}

export const OnboardingWelcomeStep = ({ headline, body, footnote }: OnboardingWelcomeStepProps) => {
  const { colors } = useThemeStore();
  const { currentLanguage } = useLanguage();
  const themeRef = useRef<BottomSheet>(null);
  const langRef = useRef<BottomSheet>(null);
  return (
    <View className="flex-1">
      <MotiView
        from={{ opacity: 0, translateY: 12 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 18, stiffness: 140 }}
        className="items-center"
      >
        <View className="flex-row w-full justify-between">
          <Pressable onPress={() => langRef.current?.snapToIndex(1)}>
            <Text className="text-base text-muted-foreground ml-2">
              {FLAGS[currentLanguage as keyof typeof FLAGS]}{' '}
              {LANGUAGES[currentLanguage as keyof typeof LANGUAGES]}
            </Text>
          </Pressable>
          <Pressable onPress={() => themeRef.current?.snapToIndex(1)}>
            <View className="flex-row items-center justify-center w-[100px] h-5 border border-border">
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderStartStartRadius: 4,
                  borderBottomLeftRadius: 4,
                  backgroundColor: colors['--primary'],
                }}
              />
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: colors['--background'],
                }}
              />
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: colors['--accent'],
                }}
              />
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: colors['--destructive'],
                }}
              />
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderEndEndRadius: 4,
                  borderTopRightRadius: 4,
                  backgroundColor: colors['--foreground'],
                }}
              />
            </View>
          </Pressable>
        </View>

        <LottieView
          source={gifs.share_with_friends}
          autoPlay
          loop
          style={{ width: '100%', height: 320 }}
        />
        <Text className="mt-6 text-3xl font-semibold text-foreground text-center">{headline}</Text>
        <Text className="mt-4 text-center text-base text-muted-foreground leading-relaxed">
          {body}
        </Text>
        {footnote && (
          <Text className="mt-3 text-center text-sm text-muted-foreground">{footnote}</Text>
        )}
      </MotiView>
      <CustomBottomSheet
        sheetRef={themeRef}
        snapPoints={['70%']}
        detached
        grabbable={false}
        opacity={0}
        scrollClassName="bg-background border-2 border-border rounded-3xl"
      >
        <ThemeSwitcher onClose={() => themeRef.current?.snapToIndex(-1)} />
      </CustomBottomSheet>
      <CustomBottomSheet
        sheetRef={langRef}
        snapPoints={['70%']}
        detached
        grabbable={false}
        opacity={0}
        scrollClassName="bg-background border-2 border-border rounded-3xl"
      >
        <Language onClose={() => langRef.current?.snapToIndex(-1)} />
      </CustomBottomSheet>
    </View>
  );
};
