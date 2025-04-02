import { SafeAreaView } from 'react-native-safe-area-context';

import FreemiumFriends from '@/components/views/friends/freemium';
import FriendsPremium from '@/components/views/friends/premium';

const FriendsScreen = () => {
  return (
    <SafeAreaView className="main-area">
      {/* {isPremium ? <FriendsPremium /> : <FreemiumFriends />} */}
      <FreemiumFriends />
    </SafeAreaView>
  );
};

export default FriendsScreen;
