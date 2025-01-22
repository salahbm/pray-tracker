import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { COLORS } from '@/constants/Colors';

export const fireToast = {
  success: (message: string) => {
    Toast.show({
      type: 'success',
      text1: message,
      text1Style: [styles.text, { color: COLORS.dark.primary }],
    });
  },
  error: (message: string) => {
    Toast.show({
      type: 'error',
      text1: message,
      text1Style: [styles.text, { color: COLORS.dark.destructive }],
    });
  },
  info: (message: string) => {
    Toast.show({
      type: 'info',
      text1: message,
      text1Style: [styles.text, { color: COLORS.dark.blue }],
    });
  },
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

const ToastProvider = () => {
  return <Toast topOffset={50} />;
};

export default ToastProvider;
