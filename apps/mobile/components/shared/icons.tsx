import type { LucideIcon } from 'lucide-react-native';
import { cssInterop } from 'nativewind';

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
  Clock4,
  ArrowLeft,
  Settings2,
  MapPin,
  MapPinned,
  Sunrise,
  SunMoon,
  Sunset,
  SunDim,
  RefreshCcw,
  Sparkles,
  ChevronRight,
  Search,
  ChevronLeft,
  Moon,
  Info,
  Palette,
  Menu,
  User,
  Edit,
  Lock,
  Settings,
  Shield,
  FileText,
  MessageSquare,
} from 'lucide-react-native';

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
iconWithClassName(Clock4);
iconWithClassName(ArrowLeft);
iconWithClassName(Settings2);
iconWithClassName(MapPin);
iconWithClassName(MapPinned);
iconWithClassName(Sunrise);
iconWithClassName(SunMoon);
iconWithClassName(Sunset);
iconWithClassName(SunDim);
iconWithClassName(RefreshCcw);
iconWithClassName(Sparkles);
iconWithClassName(ChevronRight);
iconWithClassName(Search);
iconWithClassName(ChevronLeft);
iconWithClassName(Moon);
iconWithClassName(Info);
iconWithClassName(Palette);
iconWithClassName(Menu);
iconWithClassName(User);
iconWithClassName(Edit);
iconWithClassName(Lock);
iconWithClassName(Settings);
iconWithClassName(Shield);
iconWithClassName(FileText);
iconWithClassName(MessageSquare);

export {
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
  ArrowLeft,
  Clock4,
  Settings2,
  MapPin,
  MapPinned,
  Sunrise,
  SunMoon,
  Sunset,
  SunDim,
  RefreshCcw,
  Sparkles,
  Menu,
  ChevronRight,
  Search,
  ChevronLeft,
  Moon,
  Info,
  Palette,
  User,
  Edit,
  Lock,
  Settings,
  Shield,
  FileText,
  MessageSquare,
};
