import { useEffect, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface OnboardingProgressProps {
  progress: number;
}

const clampProgress = (value: number) => Math.min(1, Math.max(0, value));

export const OnboardingProgress = ({ progress }: OnboardingProgressProps) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const progressValue = useSharedValue(0);

  useEffect(() => {
    progressValue.value = withTiming(clampProgress(progress), { duration: 300 });
  }, [progress, progressValue]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: containerWidth * progressValue.value,
    };
  }, [containerWidth]);

  const onLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  return (
    <View className="h-1.5 w-full rounded-full bg-muted overflow-hidden" onLayout={onLayout}>
      <Animated.View className="h-full rounded-full bg-primary" style={animatedStyle} />
    </View>
  );
};
