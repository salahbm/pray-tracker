import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, FlatList, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { Text } from '@/components/ui/text';
import PREMIUM_FEATURES from '@/constants/premium-features';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from '@/components/shared/icons';
import { PressableBounce } from '@/components/shared/pressable-bounce';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SubsHeader: React.FC = () => {
  const { t } = useTranslation();

  const flatListRef = useRef<FlatList>(null);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  return (
    <Animated.View entering={FadeInDown.delay(200)} className="mb-6">
      <GestureDetector gesture={Gesture.Pan().activeOffsetX([-10, 10])}>
        <FlatList
          horizontal
          ref={flatListRef}
          pagingEnabled={false}
          snapToAlignment="start"
          decelerationRate="fast"
          data={PREMIUM_FEATURES}
          keyExtractor={item => item.key}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 6 }}
          renderItem={({ item }) => (
            <View style={{ width: SCREEN_WIDTH - 40 }} className="mr-4">
              <View className="rounded-3xl overflow-hidden">
                {/* Lottie Animation */}
                <View className="flex-center" style={{ height: 280 }}>
                  <LottieView
                    source={item.gif}
                    autoPlay
                    loop
                    style={{ height: 240, width: '100%' }}
                    resizeMode="contain"
                  />
                </View>
                <View className="border-t-[0.5px] border-primary w-[200px] mx-auto" />
                {/* Feature Title */}
                <View className="p-6 px-10">
                  <Text className="text-lg font-bold text-center text-muted-foreground leading-6">
                    {t(item.title)}
                  </Text>
                </View>
              </View>
            </View>
          )}
          onMomentumScrollEnd={event => {
            const index = Math.round(event.nativeEvent.contentOffset.x / (SCREEN_WIDTH - 64 + 16));
            setActiveFeatureIndex(index);
          }}
        />
      </GestureDetector>

      {/* Pagination Dots */}
      <View className="flex-row justify-center items-center mt-4 gap-3">
        <PressableBounce
          onPress={() =>
            activeFeatureIndex > 0 &&
            flatListRef.current?.scrollToIndex({ index: activeFeatureIndex - 1 })
          }
          className="mr-2  rounded-lg p-1"
          hitSlop={20}
          disabled={activeFeatureIndex === 0}
        >
          <ChevronLeft className="text-4 text-primary" />
        </PressableBounce>
        {PREMIUM_FEATURES.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => flatListRef.current?.scrollToIndex({ index })}
            className={cn(
              'h-2 rounded-full transition-all',
              index === activeFeatureIndex ? 'w-8 bg-primary' : 'w-2 bg-primary opacity-50'
            )}
          />
        ))}
        <PressableBounce
          onPress={() =>
            activeFeatureIndex < PREMIUM_FEATURES.length - 1 &&
            flatListRef.current?.scrollToIndex({ index: activeFeatureIndex + 1 })
          }
          className="ml-2 rounded-lg p-1 "
          hitSlop={20}
          disabled={activeFeatureIndex === PREMIUM_FEATURES.length - 1}
        >
          <ChevronRight className="text-4 text-primary" />
        </PressableBounce>
      </View>
    </Animated.View>
  );
};

export { SubsHeader };
