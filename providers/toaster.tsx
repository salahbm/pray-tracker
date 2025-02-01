import { toast, Toasts } from '@backpackapp-io/react-native-toast';
import { Ban, Check, Info } from 'lucide-react-native';
import { Easing } from 'react-native-reanimated';

import { useThemeStore } from '@/store/defaults/theme';

// Colors reference (initial fallback)
let colorsRef = {
  primary: '#000',
  destructive: '#f00',
  border: '#ccc',
};

// Function to update colors
export const updateFireToastColors = (newColors: Record<string, string>) => {
  colorsRef = {
    primary: newColors['--primary'],
    destructive: newColors['--destructive'],
    border: newColors['--border'],
  };
};

export const fireToast = {
  success: (message: string) => {
    toast(message, {
      icon: <Check size={24} color={colorsRef.primary} />,
      styles: {
        text: {
          color: colorsRef.primary,
          fontSize: 14,
          marginLeft: 8,
        },
      },
    });
  },
  error: (message: string) => {
    toast(message, {
      icon: <Ban size={24} color={colorsRef.destructive} />,
      styles: {
        text: {
          color: colorsRef.destructive,
          fontSize: 14,
          marginLeft: 8,
        },
      },
    });
  },
  info: (message: string) => {
    toast(message, {
      icon: <Info size={24} color={colorsRef.border} />,
      styles: {
        text: {
          color: colorsRef.border,
          fontSize: 14,
          marginLeft: 8,
        },
      },
    });
  },
};

const ToastProvider = () => {
  const { colors } = useThemeStore();

  // Update colors for fireToast globally when ToastProvider mounts
  updateFireToastColors(colors);

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
