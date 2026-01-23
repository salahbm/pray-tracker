import { ChevronLeft } from '@/components/shared/icons';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { cn } from '@/lib/utils';

interface GoBackHeaderProps {
  title?: string;
  iconColor?: string;
  iconSize?: number;
  onRightPress?: () => void;
  titleStyle?: string;
  className?: string;
  children?: React.ReactNode;
}

const GoBack: React.FC<GoBackHeaderProps> = props => {
  const { title, iconColor, iconSize = 24, onRightPress, titleStyle, className, children } = props;
  const navigation = useNavigation();

  const canGoBack = navigation.canGoBack();

  return (
    <MotiView
      from={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 300 }}
      className={cn('flex-row items-center justify-between bg-background', className)}
    >
      {canGoBack ? (
        <MotiView
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'timing', duration: 200, delay: 100 }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 justify-center items-center active:opacity-70 active:bg-black/10 rounded-full"
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <ChevronLeft
              size={iconSize}
              className={iconColor ? '' : 'text-foreground'}
              color={iconColor}
            />
          </TouchableOpacity>
        </MotiView>
      ) : (
        <View className="w-10" />
      )}

      {title ? (
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 300, delay: 150 }}
          className="flex-1"
        >
          <Text className={cn('text-center font-semibold text-lg text-foreground', titleStyle)}>
            {title}
          </Text>
        </MotiView>
      ) : (
        <View className="flex-1" />
      )}

      {children && onRightPress ? (
        <MotiView
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'timing', duration: 200, delay: 100 }}
        >
          <TouchableOpacity
            onPress={onRightPress}
            className="justify-center items-center active:opacity-70"
            accessibilityLabel="Right action"
            accessibilityRole="button"
          >
            {children}
          </TouchableOpacity>
        </MotiView>
      ) : (
        <View className="w-10" />
      )}
    </MotiView>
  );
};

export default GoBack;
