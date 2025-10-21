import React, { useRef } from 'react';
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
import { Text } from '../ui/text';

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
  disabled?: boolean;
  enabled?: boolean;
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
  disabled,
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
    <Reanimated.View style={styleAnimation}>
      <Button
        className={className}
        variant={variant}
        size={size}
        onPress={onPress}
        disabled={disabled}
      >
        <Text className={textClassName}>{title}</Text>
      </Button>
    </Reanimated.View>
  );
};

const SwiperButton: React.FC<SwiperButtonProps> = props => {
  const {
    children,
    containerStyle,
    enabled = true,
    gestureStyle = { flex: 1, gap: 100 },
    ...restProps
  } = props;
  const reanimatedRef = useRef<SwipeableMethods>(null);
  return (
    <GestureHandlerRootView style={containerStyle}>
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
        enabled={enabled}
      >
        {children}
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
};

export default SwiperButton;
