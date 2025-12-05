import { SafeAreaView } from 'react-native-safe-area-context';


import FriendsGroups from '@/components/views/friends/groups/groups';
import { useAuthStore } from '@/store/auth/auth-session';
import PaywallScreen from '../(screens)/subscription/paywall';

const FriendsScreen = () => {
  const { user } = useAuthStore();
  return (
    <SafeAreaView className="main-area">
      {user ? <FriendsGroups /> : <PaywallScreen />}
    </SafeAreaView>
  );
};

export default FriendsScreen;
