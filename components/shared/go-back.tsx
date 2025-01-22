// components/GoBack.tsx
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { COLORS } from '@/constants/Colors';

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

const GoBack: React.FC<GoBackHeaderProps> = ({
  title,
  textColor = COLORS.dark.foreground,
  iconColor = COLORS.dark.primary,
  iconSize = 24,
  onRightPress,
  rightIconName,
  containerStyle,
  titleStyle,
}) => {
  const navigation = useNavigation();

  const canGoBack = navigation.canGoBack();

  return (
    <View style={[styles.headerContainer, containerStyle]}>
      {canGoBack ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={iconSize} color={iconColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButtonPlaceholder} />
      )}

      {title ? (
        <Text style={[styles.title, { color: textColor }, titleStyle]}>
          {title}
        </Text>
      ) : (
        <View style={styles.titlePlaceholder} />
      )}

      {rightIconName && onRightPress ? (
        <TouchableOpacity
          onPress={onRightPress}
          style={styles.rightButton}
          accessibilityLabel="Right action"
          accessibilityRole="button"
        >
          <Ionicons name={rightIconName} size={iconSize} color={iconColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.rightButtonPlaceholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: 'space-between',
    // Shadow for iOS
    shadowColor: COLORS.dark.background,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Elevation for Android
    elevation: 3,
  },
  backButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backButtonPlaceholder: {
    width: 40, // To keep title centered
  },
  rightButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  rightButtonPlaceholder: {
    width: 40, // To keep title centered
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  titlePlaceholder: {
    flex: 1,
  },
});

export default GoBack;
