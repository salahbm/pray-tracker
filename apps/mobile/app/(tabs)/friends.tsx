import { SafeAreaView } from 'react-native-safe-area-context';

import FreemiumFriends from '@/components/views/friends/freemium/freemium';
import FriendsGroups from '@/components/views/friends/groups/groups';
import { useAuthStore } from '@/store/auth/auth-session';


const FriendsScreen = () => {
  const { user } = useAuthStore();
  return (
    <SafeAreaView className="main-area">
  
      {user ? <FriendsGroups /> : <FreemiumFriends />}
    </SafeAreaView>
  );
};

export default FriendsScreen;
