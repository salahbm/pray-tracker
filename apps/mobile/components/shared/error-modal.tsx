// components/ErrorModal.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import Modal from 'react-native-modal';

import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';

interface ErrorModalProps {
  isVisible: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  modalStyle?: string;
  titleStyle?: string;
  descriptionStyle?: string;
  buttonStyle?: string;
  buttonTextStyle?: string;
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
  iconColor,
}) => {
  const { colors } = useThemeStore();
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      useNativeDriver={Platform.OS !== 'web'}
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={0}
      className="flex items-center justify-center"
      accessibilityViewIsModal
      accessibilityLabel="Error Modal"
      accessibilityRole="alert"
    >
      <View
        className={cn(
          'w-4/5  rounded-lg p-5 items-center shadow-lg bg-popover ',
          modalStyle,
        )}
      >
        {showIcon && (
          <Ionicons
            name={iconName}
            size={iconSize}
            color={iconColor ?? colors['--primary']}
            className="mb-4"
            accessibilityIgnoresInvertColors
          />
        )}
        <Text
          className={cn(
            'text-2xl font-semibold text-center mb-2 text-destructive',
            titleStyle,
          )}
        >
          {title}
        </Text>
        {description && (
          <Text
            className={cn(
              'text-base text-popover-foreground text-center mb-4',
              descriptionStyle,
            )}
          >
            {description}
          </Text>
        )}
        <TouchableOpacity
          className={cn('bg-destructive py-2 px-6 rounded', buttonStyle)}
          onPress={onClose}
          accessibilityLabel="Close Error Modal"
          accessibilityRole="button"
        >
          <Text
            className={cn(
              'text-base text-destructive-foreground font-semibold',
              buttonTextStyle,
            )}
          >
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ErrorModal;
