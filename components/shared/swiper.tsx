import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Button } from '../ui/button';

// Define props for the SwiperButton
interface SwiperButtonProps {
  children?: React.ReactNode;
  onPress?: () => void;
  title?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  textClassName?: string;
  containerStyle?: object;
  gestureStyle?: object;
}

const RightAction = ({
  progress,
  drag,
  onPress,
  title = 'Remove',
  variant = 'destructive',
  size,
  className,
  textClassName,
}: {
  progress: SharedValue<number>;
  drag: SharedValue<number>;
} & SwiperButtonProps) => {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 50 }],
      opacity: progress.value > 0 ? 1 : 0, // Initially hide the button
    };
  });

  return (
    <Reanimated.View style={[styleAnimation]}>
      <Button
        className={className}
        variant={variant}
        size={size}
        onPress={onPress}
      >
        <Text className={textClassName}>{title}</Text>
      </Button>
    </Reanimated.View>
  );
};

const SwiperButton: React.FC<SwiperButtonProps> = (props) => {
  const { children, containerStyle, gestureStyle, ...restProps } = props;

  return (
    <GestureHandlerRootView style={[styles.container, containerStyle]}>
      <ReanimatedSwipeable
        containerStyle={[gestureStyle]}
        friction={1}
        enableTrackpadTwoFingerGesture
        rightThreshold={60}
        renderRightActions={(progress, dragX) => (
          <RightAction progress={progress} drag={dragX} {...restProps} />
        )}
        overshootRight={false}
      >
        {children}
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SwiperButton;
