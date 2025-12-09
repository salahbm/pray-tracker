import { SafeAreaView } from 'react-native-safe-area-context';
import FriendsGroups from '@/components/views/friends/groups/groups';
import { useAuthStore } from '@/store/auth/auth-session';
import PaywallScreen from '../(screens)/subscription/paywall';
import { useRevenueCatCustomer } from '@/hooks/subscriptions/useRevenueCat';

const FriendsScreen = () => {
  const { user } = useAuthStore();
  const { isPremium } = useRevenueCatCustomer();
  return (
    <SafeAreaView className="main-area">
      {user && isPremium ? <FriendsGroups /> : <PaywallScreen />}
    </SafeAreaView>
  );
};

export default FriendsScreen;
