import React from 'react';
import { GestureResponderEvent, Pressable, PressableProps } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const easing = Easing.inOut(Easing.ease);

interface PressableBounceProps extends PressableProps {
  children?: React.ReactNode;

  bounceScale?: number;
  /**
   * @description scale of the bounce animation
   * @default 0.95
   */
  duration?: number;
  /**
   * @description damping of the spring animation
   * @default 15
   */
  damping?: number;
  /**
   * @description stiffness of the spring animation
   * @default 200
   */
  stiffness?: number;
}

const PressableBounce: React.FC<PressableBounceProps> = ({
  children,
  bounceScale = 0.95,
  duration = 150,
  damping = 15,
  stiffness = 200,
  ...props
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = (event: GestureResponderEvent) => {
    scale.value = withTiming(bounceScale, {
      duration,
      easing,
    });
    props.onPressIn && props.onPressIn(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    scale.value = withSpring(1, { damping, stiffness });
    props.onPressOut && props.onPressOut(event);
  };

  return (
    <AnimatedPressable
      {...props}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedStyle, props.style]}
    >
      {children}
    </AnimatedPressable>
  );
};

export { PressableBounce };
