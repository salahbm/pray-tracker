import React from 'react';
import { Platform } from 'react-native';
import ReactNativeModal, { ModalProps } from 'react-native-modal';

interface IModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<IModalProps & Partial<ModalProps>> = ({
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
  ...props
}) => {
  return (
    <ReactNativeModal
      animationIn={animationIn}
      animationOut={animationOut}
      animationInTiming={animationInTiming}
      animationOutTiming={animationOutTiming}
      backdropTransitionInTiming={backdropTransitionInTiming}
      backdropTransitionOutTiming={backdropTransitionOutTiming}
      backdropColor={backdropColor}
      backdropOpacity={backdropOpacity}
      avoidKeyboard={avoidKeyboard}
      useNativeDriver={Platform.OS !== 'web'}
      useNativeDriverForBackdrop={Platform.OS !== 'web'}
      hideModalContentWhileAnimating={true}
      {...props}
    >
      {children}
    </ReactNativeModal>
  );
};

export default Modal;
