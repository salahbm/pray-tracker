// components/ErrorModal.tsx
import { Ionicons } from '@expo/vector-icons';
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
import Modal from 'react-native-modal';

import { COLORS } from '@/constants/Colors';

interface ErrorModalProps {
  isVisible: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  // Optional styling props
  modalStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  // Optional icon
  showIcon?: boolean;
  iconName?: React.ComponentProps<typeof Ionicons>['name'];
  iconSize?: number;
  iconColor?: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  isVisible,
  title,
  description,
  onClose,
  modalStyle,
  titleStyle,
  descriptionStyle,
  buttonStyle,
  buttonTextStyle,
  showIcon = true,
  iconName = 'alert-circle',
  iconSize = 50,
  iconColor = COLORS.dark.destructive, // iOS default error color
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      useNativeDriver
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={0}
      style={styles.modalContainer}
      accessibilityViewIsModal
      accessibilityLabel="Error Modal"
      accessibilityRole="alert"
    >
      <View style={[styles.modalContent, modalStyle]}>
        {showIcon && (
          <Ionicons
            name={iconName}
            size={iconSize}
            color={iconColor}
            style={styles.icon}
            accessibilityIgnoresInvertColors
          />
        )}
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {description ? (
          <Text style={[styles.description, descriptionStyle]}>
            {description}
          </Text>
        ) : null}
        <TouchableOpacity
          style={[styles.button, buttonStyle]}
          onPress={onClose}
          accessibilityLabel="Close Error Modal"
          accessibilityRole="button"
        >
          <Text style={[styles.buttonText, buttonTextStyle]}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLORS.dark.muted,
    borderRadius: 12,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  icon: {
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.dark.destructive, // iOS default error color
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: COLORS.dark.muted_foreground,
    textAlign: 'center',
    marginBottom: 25,
  },
  button: {
    backgroundColor: COLORS.dark.destructive,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.dark.muted,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ErrorModal;
