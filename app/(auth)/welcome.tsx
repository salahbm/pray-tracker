import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

import { Button } from 'components/ui/button';
import { Text } from 'components/ui/text';
import { onboarding } from 'constants/onboarding';
import { useOnboarding } from 'store/defaults/onboarding';

const Home = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { setVisited } = useOnboarding();

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
    <SafeAreaView className="flex h-full items-center justify-between bg-background">
      <Swiper
        ref={swiperRef}
        loop={false}
        className="bg-background mt-10"
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-gray-300 rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-primary rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              className="w-full aspect-square h-[300px] rounded-full"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-foreground text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-md text-center mx-10 mt-3 text-muted-foreground">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <Button onPress={onNextPress} className="w-11/12 mt-10 mb-5">
        <Text>{isLastSlide ? 'Get Started' : 'Next'}</Text>
      </Button>
      <TouchableOpacity
        onPress={onSkipPress}
        className="w-full flex justify-center items-center p-5"
      >
        <Text className="text-foreground text-md">Skip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
