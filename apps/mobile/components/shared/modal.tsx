import React from 'react';
import { Modal as RNModal, Platform } from 'react-native';

interface IModalProps {
  children: React.ReactNode;
  animationIn?: string;
  animationOut?: string;
  animationInTiming?: number;
  animationOutTiming?: number;
  backdropTransitionInTiming?: number;
  backdropTransitionOutTiming?: number;
  backdropColor?: string;
  backdropOpacity?: number;
  avoidKeyboard?: boolean;
  isVisible?: boolean;
  onBackdropPress?: () => void;
  onBackButtonPress?: () => void;
  useNativeDriver?: boolean;
  useNativeDriverForBackdrop?: boolean;
  hideModalContentWhileAnimating?: boolean;
  className?: string;
}

const Modal: React.FC<IModalProps> = ({
  children,
  animationIn = 'zoomIn',
  animationOut = 'zoomOut',
  animationInTiming = 1,
  animationOutTiming = 1,
  backdropTransitionInTiming = 1,
  backdropTransitionOutTiming = 0,
  backdropColor = 'rgba(0, 0, 0, 0.3)',
  backdropOpacity = 0.5,
  avoidKeyboard = true,
  className,
  ...props
}) => {
  return (
    <RNModal
      // animationIn={animationIn}
      // animationOut={animationOut}
      // animationInTiming={animationInTiming}
      // animationOutTiming={animationOutTiming}
      // backdropTransitionInTiming={backdropTransitionInTiming}
      // backdropTransitionOutTiming={backdropTransitionOutTiming}
      backdropColor={backdropColor}
      // backdropOpacity={backdropOpacity}
      className={className}
      // avoidKeyboard={avoidKeyboard}
      useNativeDriver={Platform.OS !== 'web'}
      useNativeDriverForBackdrop={Platform.OS !== 'web'}
      hideModalContentWhileAnimating={true}
      {...props}
    >
      {children}
    </RNModal>
  );
};

export default Modal;
