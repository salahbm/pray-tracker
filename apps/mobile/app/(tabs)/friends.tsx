import { SafeAreaView } from 'react-native-safe-area-context';

import FreemiumFriends from '@/components/views/friends/freemium/freemium';
import FriendsGroups from '@/components/views/friends/groups/groups';
import { useAuthStore } from '@/store/auth/auth-session';
import { Link } from 'expo-router';
import { Text } from '@/components/ui/text';

const FriendsScreen = () => {
  const { user } = useAuthStore();
  return (
    <SafeAreaView className="main-area">
      <Link href="/(screens)/subscription/paywall">
        <Text>Upgrade</Text>
      </Link>
      {user ? <FriendsGroups /> : <FreemiumFriends />}
    </SafeAreaView>
  );
};

export default FriendsScreen;
