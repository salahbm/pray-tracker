import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Loader from '@/components/shared/loader';
import { useGetUsersList } from '@/hooks/awards/useGetUsers';
import { Text } from 'components/ui/text';

export default function HomeScreen() {
  const { data, isLoading } = useGetUsersList();
  return (
    <SafeAreaView className="main-area">
      <Loader visible={isLoading} />
      <View>
        <Text> List of users</Text>
        {data?.map((user) => (
          <View
            key={user.id}
            className="mb-2 flex-row w-full items-center justify-between"
          >
            <Text>{user.username}</Text>
            <Text>{user.totalPoints}</Text>
            <Text>{user.email}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
