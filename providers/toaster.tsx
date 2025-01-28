import { toast, Toasts } from '@backpackapp-io/react-native-toast';
import { Ban, Check, Info } from 'lucide-react-native';
import { Easing } from 'react-native-reanimated';

import { COLORS } from '@/constants/Colors';
import { useThemeStore } from '@/store/defaults/theme';

export const fireToast = {
  success: (message: string) => {
    toast(message, {
      icon: <Check size={24} color={COLORS.dark.primary} />,
      styles: {
        text: {
          color: COLORS.dark.primary,
          fontSize: 14,
          marginLeft: 8,
        },
      },
    });
  },
  error: (message: string) => {
    toast(message, {
      icon: <Ban size={24} color={COLORS.dark.destructive} />,
      styles: {
        text: {
          color: COLORS.dark.destructive,
          fontSize: 14,
          marginLeft: 8,
        },
      },
    });
  },
  info: (message: string) => {
    toast(message, {
      icon: <Info size={24} color={COLORS.dark.border} />,
      styles: {
        text: {
          color: COLORS.dark.border,
          fontSize: 14,
          marginLeft: 8,
        },
      },
    });
  },
};

const ToastProvider = () => {
  const { colors } = useThemeStore();
  return (
    <Toasts
      defaultStyle={{
        pressable: {
          backgroundColor: colors['--background'],
          borderWidth: 1,
          borderColor: colors['--border'],
          zIndex: 10000,
        },
        view: {
          backgroundColor: colors['--background'],
          borderRadius: 8,
          padding: 16,
        },
        indicator: {
          marginRight: 0,
        },
      }}
      globalAnimationConfig={{
        duration: 500,
        flingPositionReturnDuration: 200,
        easing: Easing.elastic(1),
      }}
    />
  );
};

export default ToastProvider;
