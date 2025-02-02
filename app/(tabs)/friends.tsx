import { SafeAreaView } from 'react-native-safe-area-context';

import FriendsPremium from '@/components/views/friends/premium';

const FriendsScreen = () => {
  return (
    <SafeAreaView className="main-area">
      <FriendsPremium />
    </SafeAreaView>
  );
};

export default FriendsScreen;
