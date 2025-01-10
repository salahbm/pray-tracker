import {
  MoonStar,
  Sun,
  Home,
  Compass,
  Award,
  Users,
  UserPlus,
  Trophy,
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

iconWithClassName(Sun);
iconWithClassName(MoonStar);
iconWithClassName(Home);
iconWithClassName(Compass);
iconWithClassName(Award);
iconWithClassName(Users);
iconWithClassName(UserPlus);
iconWithClassName(Trophy);

export { Sun, MoonStar, Home, Compass, Award, Users, UserPlus, Trophy };
