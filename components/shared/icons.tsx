import { MoonStar, Sun } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { cssInterop } from 'nativewind';

export function iconWithClassName(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}

iconWithClassName(Sun);
iconWithClassName(MoonStar);
export { Sun, MoonStar };
