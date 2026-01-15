import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Animated, Easing, ViewStyle } from 'react-native';
import { Star, Zap, Heart, Sparkles as SparklesIcon, Music, Snowflake } from 'lucide-react-native';

// --- Types ---
interface SparkleProps {
  id: string;
  style: ViewStyle;
  color: string;
  size: number;
  delay: number;
  duration: number;
  IconComponent: any;
}

interface SparklesProps {
  count?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
}

// --- Constants ---
const DEFAULT_COLORS = ['#FFD700', '#FF69B4', '#00BFFF', '#50C878', '#FFFFFF'];
const ICONS = [Star, Zap, Heart, SparklesIcon, Music, Snowflake];

// --- Helper: Random Number Generator ---
const random = (min: number, max: number) => Math.random() * (max - min) + min;
const randomChoice = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// --- Individual Sparkle Item ---
const SparkleInstance = ({ color, size, delay, duration, IconComponent, style }: SparkleProps) => {
  const [anim] = useState(new Animated.Value(0));

  useEffect(() => {
    // 1. Wait for the delay
    // 2. Animate from 0 to 1
    // 3. Loop infinitely
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: 1,
          duration: duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true, // Crucial for performance in Expo
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 0, // Instant reset
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [delay, duration]);

  // Interpolations based on the 0 -> 1 progress
  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -40], // Floats up 40px
  });

  const opacity = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0], // Fades in then out
  });

  const scale = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0.5], // Scales up then shrinks slightly
  });

  const rotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'], // Rotates slightly
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.sparkle,
        style,
        {
          transform: [{ translateY }, { scale }, { rotate }],
          opacity,
        },
      ]}
    >
      {/* NOTE: We pass the color directly to the Lucide icon.
         We do NOT animate the Lucide props directly, we animate the View wrapper.
      */}
      <IconComponent color={color} fill={color} size={size} />
    </Animated.View>
  );
};

// --- Main Container ---
export const Sparkles = ({
  count = 15,
  colors = DEFAULT_COLORS,
  minSize = 10,
  maxSize = 20,
}: SparklesProps) => {
  const [sparkles, setSparkles] = useState<SparkleProps[]>([]);

  // Generate sparkles only once on mount to avoid re-renders flickers
  useEffect(() => {
    const items = Array.from({ length: count }).map((_, i) => ({
      id: `sparkle-${i}`,
      size: random(minSize, maxSize),
      style: {
        left: `${random(0, 100)}%`,
        top: `${random(0, 100)}%`,
      } as ViewStyle,
      color: randomChoice(colors),
      delay: random(0, 2000),
      duration: random(1500, 3000),
      IconComponent: randomChoice(ICONS),
    }));
    setSparkles(items);
  }, [count, colors, minSize, maxSize]);

  // If no sparkles generated yet, render nothing
  if (sparkles.length === 0) return null;

  return (
    // pointerEvents="none" ensures clicks pass through the sparks to the button/card below
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {sparkles.map(sparkle => (
        <SparkleInstance key={sparkle.id} {...sparkle} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sparkle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
});
