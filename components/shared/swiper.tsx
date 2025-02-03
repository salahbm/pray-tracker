import React, { useRef } from 'react';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
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
  const animatedDrag = useDerivedValue(() => drag.value);
  const animatedProgress = useDerivedValue(() => progress.value);

  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animatedDrag.value + 100 }],
      opacity: animatedProgress.value,
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
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
  const {
    children,
    containerStyle,
    gestureStyle = { flex: 1, gap: 100 },
    ...restProps
  } = props;
  const reanimatedRef = useRef<SwipeableMethods>(null);
  return (
    <GestureHandlerRootView style={[containerStyle]}>
      <ReanimatedSwipeable
        ref={reanimatedRef}
        containerStyle={[gestureStyle]}
        friction={1}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
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

export default SwiperButton;
