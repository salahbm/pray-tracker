// components/GoBack.tsx
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import { useThemeStore } from '@/store/defaults/theme';

interface GoBackHeaderProps {
  title?: string;
  textColor?: string;
  iconColor?: string;
  iconSize?: number;
  onRightPress?: () => void;
  rightIconName?: React.ComponentProps<typeof Ionicons>['name'];
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const GoBack: React.FC<GoBackHeaderProps> = props => {
  const { colors } = useThemeStore();
  const {
    title,
    textColor = colors['--foreground'],
    iconColor = colors['--primary'],
    iconSize = 24,
    onRightPress,
    rightIconName,
  } = props;
  const navigation = useNavigation();

  const canGoBack = navigation.canGoBack();

  return (
    <View className="flex-row items-center justify-between bg-background mb-4">
      {canGoBack ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 justify-center items-start"
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={iconSize} color={iconColor} />
        </TouchableOpacity>
      ) : (
        <View className="w-10" />
      )}

      {title ? (
        <Text className="text-center flex-1 font-semibold text-lg" style={{ color: textColor }}>
          {title}
        </Text>
      ) : (
        <View className="flex-1" />
      )}

      {rightIconName && onRightPress ? (
        <TouchableOpacity
          onPress={onRightPress}
          className="w-10 justify-center items-end"
          accessibilityLabel="Right action"
          accessibilityRole="button"
        >
          <Ionicons name={rightIconName} size={iconSize} color={iconColor} />
        </TouchableOpacity>
      ) : (
        <View className="w-10" />
      )}
    </View>
  );
};

export default GoBack;
