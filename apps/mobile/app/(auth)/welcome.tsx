import BottomSheet from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Platform, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

import CustomBottomSheet from '@/components/shared/bottom-sheet';
import { FLAGS, Language, LANGUAGES } from '@/components/shared/language';
import ThemeSwitcher from '@/components/shared/theme-switcher';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { onboarding } from '@/constants/onboarding';
import { useLanguage } from '@/hooks/common/useTranslation';
import { useOnboarding } from '@/store/defaults/onboarding';
import { useThemeStore } from '@/store/defaults/theme';

const BANNER_HEIGHT = 450;

const Welcome = () => {
  const { t } = useTranslation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const { setVisited } = useOnboarding();
  const { colors } = useThemeStore();
  const { currentLanguage } = useLanguage();

  const isLastSlide = activeIndex === onboarding.length - 1;

  const swiperRef = useRef<Swiper>(null);
  const themeRef = useRef<BottomSheet>(null);
  const langRef = useRef<BottomSheet>(null);

  const onSkipPress = () => {
    setVisited(true);
    router.replace('/(tabs)');
  };

  const onNextPress = () => {
    if (isLastSlide) {
      onSkipPress();
    } else {
      swiperRef.current?.scrollBy(1, true);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
      <Swiper
        ref={swiperRef}
        loop={false}
        className="bg-transparent"
        // dot={<View className="w-[32px] h-[4px] mx-1 bg-gray-300 rounded-full" />}
        // activeDot={<View className="w-[32px] h-[4px] mx-1 bg-primary rounded-full" />}
        onIndexChanged={index => setActiveIndex(index)}
      >
        {onboarding.map((item, index) => (
          <View key={item.id} className="flex-1 bg-background">
            <Animated.ScrollView
              showsVerticalScrollIndicator={false}
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                useNativeDriver: Platform.OS !== 'web',
              })}
              scrollEventThrottle={16}
            >
              <Animated.View
                style={{
                  transform: [
                    {
                      translateY: scrollY.interpolate({
                        inputRange: [-BANNER_HEIGHT, 0, BANNER_HEIGHT],
                        outputRange: [-BANNER_HEIGHT / 2, 0, BANNER_HEIGHT * 0.75],
                      }),
                    },
                  ],
                }}
              >
                <LottieView
                  source={item.gif}
                  autoPlay
                  loop
                  style={{ height: BANNER_HEIGHT, width: '100%' }}
                  resizeMode="cover"
                />
              </Animated.View>

              <View className="bg-background rounded-t-3xl -mt-5 px-5 pt-10 border-[0.2px] border-border min-h-fit h-full">
                {index === 0 && (
                  <View className="touchable px-6">
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
                )}
                <View className="flex flex-row items-center justify-center w-full">
                  <Text className="text-foreground text-3xl font-bold  text-center">
                    {t(item.titleKey)}
                  </Text>
                </View>
                <Text className="text-md text-center mt-10 mb-20 text-muted-foreground">
                  {t(item.descriptionKey)}
                </Text>
              </View>
            </Animated.ScrollView>
          </View>
        ))}
      </Swiper>

      <View className="flex items-center flex-row gap-4 pb-10 px-4">
        <Pressable
          onPress={onSkipPress}
          className="flex-center p-3 rounded-full w-fit border border-muted"
        >
          <Text className="text-muted-foreground text-sm">{t('auth.welcome.skip')}</Text>
        </Pressable>
        <Button onPress={onNextPress} className="rounded-full flex-1">
          <Text>{isLastSlide ? t('auth.welcome.getStarted') : t('auth.welcome.next')}</Text>
        </Button>
      </View>

      <CustomBottomSheet sheetRef={themeRef} snapPoints={['80%']}>
        <ThemeSwitcher onClose={() => themeRef.current?.close()} />
      </CustomBottomSheet>
      <CustomBottomSheet sheetRef={langRef} snapPoints={['80%']}>
        <Language onClose={() => langRef.current?.close()} />
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default Welcome;
