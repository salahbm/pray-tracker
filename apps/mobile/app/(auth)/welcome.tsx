import BottomSheet from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  TouchableOpacity,
  View,
  Animated,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

import CustomBottomSheet from '@/components/shared/bottom-sheet';
import { FLAGS, Language } from '@/components/shared/language';
import ThemeSwitcher from '@/components/shared/theme-switcher';
import { useLanguage } from '@/hooks/common/useTranslation';
import { useThemeStore } from '@/store/defaults/theme';
import { Button } from 'components/ui/button';
import { Text } from 'components/ui/text';
import { onboarding } from 'constants/onboarding';
import { useOnboarding } from 'store/defaults/onboarding';

const BANNER_HEIGHT = 400;

const Welcome = () => {
  const { t } = useTranslation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const { setVisited } = useOnboarding();
  const { height: windowHeight } = useWindowDimensions();
  const { colors } = useThemeStore();
  const { currentLanguage } = useLanguage();

  const isLastSlide = activeIndex === onboarding.length - 1;

  const swiperRef = useRef<Swiper>(null);
  const themeRef = useRef<BottomSheet>(null);
  const langRef = useRef<BottomSheet>(null);

  const onNextPress = () => {
    if (isLastSlide) {
      setVisited();
      router.replace('/(tabs)');
    } else {
      swiperRef.current?.scrollBy(1, true);
    }
  };

  const onSkipPress = () => {
    setVisited();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
      <Swiper
        ref={swiperRef}
        loop={false}
        className="bg-transparent"
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-gray-300 rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-primary rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item, index) => (
          <View key={item.id} className="flex-1 bg-background">
            <Animated.ScrollView
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: Platform.OS !== 'web' },
              )}
              scrollEventThrottle={16}
            >
              <Animated.View
                style={{
                  transform: [
                    {
                      translateY: scrollY.interpolate({
                        inputRange: [-BANNER_HEIGHT, 0, BANNER_HEIGHT],
                        outputRange: [
                          -BANNER_HEIGHT / 2,
                          0,
                          BANNER_HEIGHT * 0.75,
                        ],
                      }),
                    },
                  ],
                }}
              >
                <Image
                  source={item.image}
                  className="w-full object-cover"
                  style={{ height: BANNER_HEIGHT }}
                />
              </Animated.View>

              <View
                style={{ minHeight: windowHeight - BANNER_HEIGHT }}
                className="bg-background rounded-t-3xl -mt-5 px-5 pt-10"
              >
                {index === 0 && (
                  <View className="touchable px-6">
                    <TouchableOpacity
                      onPress={() => langRef.current?.snapToIndex(2)}
                    >
                      <Text className="text-base text-muted-foreground ml-2">
                        {FLAGS[currentLanguage]}{' '}
                        {t('Commons.Locales.languages.' + currentLanguage)}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => themeRef.current?.snapToIndex(2)}
                    >
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
                    </TouchableOpacity>
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

      <Button onPress={onNextPress} className="w-11/12 mx-auto mb-2">
        <Text>
          {isLastSlide ? t('Auth.Welcome.GetStarted') : t('Auth.Welcome.Next')}
        </Text>
      </Button>
      <TouchableOpacity
        onPress={onSkipPress}
        className="w-full flex justify-center items-center p-5"
      >
        <Text className="text-foreground text-md">
          {t('Auth.Welcome.Skip')}
        </Text>
      </TouchableOpacity>

      <CustomBottomSheet sheetRef={themeRef}>
        <ThemeSwitcher />
      </CustomBottomSheet>
      <CustomBottomSheet sheetRef={langRef}>
        <Language />
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default Welcome;
