// components/ErrorModal.tsx
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { cn } from '@/lib/utils';

import Modal from './modal';
import { Info } from '../icons';

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
}) => {
  return (
    <Modal visible={isVisible} onRequestClose={onClose}>
      <View
        className={cn('w-4/5  rounded-lg p-5 items-center shadow-lg bg-background/80 ', modalStyle)}
      >
        {showIcon && <Info size={32} color="text-destructive" />}
        <Text
          className={cn('text-2xl font-semibold text-center mb-2 text-destructive', titleStyle)}
        >
          {title}
        </Text>
        {description && (
          <Text className={cn('text-base text-foreground text-center mb-4', descriptionStyle)}>
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
            className={cn('text-base text-destructive-foreground font-semibold', buttonTextStyle)}
          >
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ErrorModal;
