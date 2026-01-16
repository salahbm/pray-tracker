import { useEffect, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { cn } from '@/lib/utils';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';

// Create an Animated Rect component
const AnimatedRect = Animated.createAnimatedComponent(Rect);

interface BorderBeamProps {
  duration?: number;
  borderWidth?: number;
  size?: number; // Length of the beam
  colorFrom?: string;
  colorTo?: string;
  rx?: number; // Border Radius (Horizontal)
  ry?: number; // Border Radius (Vertical)
  className?: string;
  style?: ViewStyle;
}

export const BorderBeam = ({
  duration = 4000,
  borderWidth = 2,
  size = 300, // The length of the beam
  colorFrom = '#ffaa40',
  colorTo = '#9c40ff',
  rx = 16, // Default to match rounded-2xl (approx 16px)
  ry = 16,
  className,
}: BorderBeamProps) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const progress = useSharedValue(0);

  // Calculate perimeter for the dash array
  // Perimeter ≈ 2 * (width + height)
  const perimeter = 2 * (dimensions.width + dimensions.height);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration,
        easing: Easing.linear,
      }),
      -1 // Infinite repeat
    );
  }, [duration, progress]);

  const animatedProps = useAnimatedProps(() => {
    // If we haven't measured yet, don't draw
    if (perimeter === 0) return { strokeDashoffset: 0 };

    const offset = interpolate(progress.value, [0, 1], [0, -perimeter]);

    return {
      strokeDashoffset: offset,
    };
  });

  return (
    <View
      className={cn('absolute inset-0 pointer-events-none', className)}
      onLayout={e => {
        setDimensions({
          width: e.nativeEvent.layout.width,
          height: e.nativeEvent.layout.height,
        });
      }}
    >
      <Svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        style={StyleSheet.absoluteFill}
      >
        <Defs>
          <LinearGradient id="border-beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0" stopColor={colorFrom} stopOpacity="1" />
            <Stop offset="1" stopColor={colorTo} stopOpacity="1" />
          </LinearGradient>
        </Defs>

        {dimensions.width > 0 && (
          <AnimatedRect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={dimensions.width - borderWidth}
            height={dimensions.height - borderWidth}
            rx={rx}
            ry={ry}
            fill="transparent"
            stroke="url(#border-beam-gradient)"
            strokeWidth={borderWidth}
            strokeLinecap="round"
            // The magic: [beam length, gap length]
            strokeDasharray={[size, perimeter - size]}
            animatedProps={animatedProps}
          />
        )}
      </Svg>
    </View>
  );
};
