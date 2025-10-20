import type { LucideIcon } from 'lucide-react-native';
import {
  Calendar,
  ChevronDown,
  Compass,
  Home,
  LogOut,
  MoonStar,
  Sun,
  Trophy,
  UserPlus,
  Users,
  X,
} from 'lucide-react-native';
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
iconWithClassName(Calendar);
iconWithClassName(Users);
iconWithClassName(UserPlus);
iconWithClassName(Trophy);
iconWithClassName(LogOut);
iconWithClassName(X);

export { Calendar, ChevronDown, Compass, Home, LogOut, MoonStar, Sun, Trophy, UserPlus, Users, X };
