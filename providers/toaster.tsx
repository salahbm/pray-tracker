import { toast, Toasts } from '@backpackapp-io/react-native-toast';
import { Ban, Check, Info } from 'lucide-react-native';
import { Easing } from 'react-native-reanimated';

import { COLORS } from '@/constants/Colors';

export const fireToast = {
  success: (message: string) => {
    toast(message, {
      icon: <Check size={24} color={COLORS.dark.primary} />,
      styles: {
        pressable: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: COLORS.dark.primary,
          zIndex: 10000,
        },
        view: {
          backgroundColor: 'transparent',
          borderRadius: 8,
          padding: 16,
        },
        text: {
          color: COLORS.dark.primary,
          fontSize: 14,
          marginLeft: 8,
        },
        indicator: {
          marginRight: 0,
        },
      },
    });
  },
  error: (message: string) => {
    toast(message, {
      icon: <Ban size={24} color={COLORS.dark.destructive} />,
      styles: {
        pressable: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: COLORS.dark.destructive,
        },
        view: {
          backgroundColor: 'transparent',
          borderRadius: 8,
          padding: 16,
        },
        text: {
          color: COLORS.dark.destructive,
          fontSize: 14,
          marginLeft: 8,
        },
        indicator: {
          marginRight: 0,
        },
      },
    });
  },
  info: (message: string) => {
    toast(message, {
      icon: <Info size={24} color={COLORS.dark.border} />,
      styles: {
        pressable: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: COLORS.dark.border,
        },
        view: {
          backgroundColor: 'transparent',
          borderRadius: 8,
          padding: 16,
        },
        text: {
          color: COLORS.dark.border,
          fontSize: 14,
          marginLeft: 8,
        },
        indicator: {
          marginRight: 0,
        },
      },
    });
  },
};

const ToastProvider = () => {
  return (
    <Toasts
      globalAnimationConfig={{
        duration: 500,
        flingPositionReturnDuration: 200,
        easing: Easing.elastic(1),
      }}
    />
  );
};

export default ToastProvider;
