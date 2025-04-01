import { SafeAreaView } from 'react-native-safe-area-context';

import FreemiumFriends from '@/components/views/friends/freemium';
import FriendsPremium from '@/components/views/friends/premium';
import { usePurchases } from '@/hooks/use-purchases';

const FriendsScreen = () => {
  const { isPremium } = usePurchases();
  return (
    <SafeAreaView className="main-area">
      {isPremium ? <FriendsPremium /> : <FreemiumFriends />}
    </SafeAreaView>
  );
};

export default FriendsScreen;
