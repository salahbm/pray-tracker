import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  TouchableOpacity,
  View,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

import { Button } from 'components/ui/button';
import { Text } from 'components/ui/text';
import { onboarding } from 'constants/onboarding';
import { useOnboarding } from 'store/defaults/onboarding';

const BANNER_HEIGHT = 400;

const Welcome = () => {
  const { t } = useTranslation();
  const swiperRef = useRef<Swiper>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const { setVisited } = useOnboarding();
  const { height: windowHeight } = useWindowDimensions();

  const isLastSlide = activeIndex === onboarding.length - 1;

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
        {onboarding.map((item) => (
          <View key={item.id} className="flex-1 bg-background">
            <Animated.ScrollView
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true },
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
                  className="w-full"
                  style={{ height: BANNER_HEIGHT }}
                  resizeMode="cover"
                />
              </Animated.View>

              <View
                style={{ minHeight: windowHeight - BANNER_HEIGHT }}
                className="bg-background rounded-t-3xl -mt-5 px-5 pt-10"
              >
                <View className="flex flex-row items-center justify-center w-full">
                  <Text className="text-foreground text-3xl font-bold mx-10 text-center">
                    {item.title}
                  </Text>
                </View>
                <Text className="text-md text-center mx-10 mt-10 text-muted-foreground">
                  {item.description}
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
    </SafeAreaView>
  );
};

export default Welcome;
