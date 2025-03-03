import { SafeAreaView } from 'react-native-safe-area-context';

import FreemiumFriends from '@/components/views/friends/freemium';
import FriendsPremium from '@/components/views/friends/premium';
import { useSubscription } from '@/hooks/use-subscription';

const FriendsScreen = () => {
  const { isPremium } = useSubscription();
  return (
    <SafeAreaView className="main-area">
      {isPremium ? <FriendsPremium /> : <FreemiumFriends />}
    </SafeAreaView>
  );
};

export default FriendsScreen;
