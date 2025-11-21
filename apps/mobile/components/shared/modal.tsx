import React from 'react';
import {
  Dimensions,
  Modal as RNModal,
  ModalProps,
  StyleSheet,
  TouchableOpacity,
  View,
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
  backdrop: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  content: {
    borderRadius: 16,
    elevation: 8,
    maxWidth: 420,
    width: Dimensions.get('window').width * 0.9,
    zIndex: 2,
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
  },
});

export default Modal;
