import React from 'react';
import {
  Modal as RNModal,
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  ModalProps,
} from 'react-native';

interface IModalProps extends ModalProps {
  visible: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<IModalProps> = ({ visible, children, onRequestClose, ...props }) => {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onRequestClose}
      {...props}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onRequestClose} />

        <View style={styles.content} className="bg-muted overflow-hidden">
          {children}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  content: {
    width: Dimensions.get('window').width * 0.9,
    maxWidth: 420,
    borderRadius: 16,
    elevation: 8,
    zIndex: 2,
  },
});

export default Modal;
