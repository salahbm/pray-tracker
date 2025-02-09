import { SafeAreaView } from 'react-native-safe-area-context';

import FreemiumFriends from '@/components/views/friends/freemium';
import FriendsPremium from '@/components/views/friends/premium';
import { useAuthStore } from '@/store/auth/auth-session';

const FriendsScreen = () => {
  const { user } = useAuthStore();
  const isUserPremium = user?.premium;
  const userPremiumUntil = user?.premiumExpiry;
  const today = new Date();
  const isPremium = isUserPremium && today < userPremiumUntil!;
  return (
    <SafeAreaView className="main-area">
      {isPremium ? <FriendsPremium /> : <FreemiumFriends />}
    </SafeAreaView>
  );
};

export default FriendsScreen;
