import { SafeAreaView } from 'react-native-safe-area-context';

import FreemiumFriends from '@/components/views/friends/freemium';
import FriendsPremium from '@/components/views/friends/premium';
import { isProUser } from '@/lib/utils';
import { useAuthStore } from '@/store/auth/auth-session';
import { TUser } from '@/types/user';

const FriendsScreen = () => {
  const { user } = useAuthStore();
  return (
    <SafeAreaView className="main-area">
      {isProUser(user as TUser) ? <FriendsPremium /> : <FreemiumFriends />}
    </SafeAreaView>
  );
};

export default FriendsScreen;
