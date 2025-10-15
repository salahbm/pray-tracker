import {
  MoonStar,
  Sun,
  Home,
  Compass,
  Award,
  Users,
  UserPlus,
  Trophy,
  LogOut,
  ChevronDown,
  X,
} from 'lucide-react-native';
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

iconWithClassName(ChevronDown);
iconWithClassName(Sun);
iconWithClassName(MoonStar);
iconWithClassName(Home);
iconWithClassName(Compass);
iconWithClassName(Award);
iconWithClassName(Users);
iconWithClassName(UserPlus);
iconWithClassName(Trophy);
iconWithClassName(LogOut);
iconWithClassName(X);

export {
  Sun,
  MoonStar,
  Home,
  Compass,
  Award,
  Users,
  UserPlus,
  Trophy,
  LogOut,
  ChevronDown,
  X,
};
