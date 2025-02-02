import { useState } from 'react';
import { View, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import Loader from '@/components/shared/loader';
import NoData from '@/components/shared/no-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useRequest } from '@/hooks/friends/useRequest';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { useGetApprovedFriends } from '@/hooks/friends/useGetApproved';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { router } from 'expo-router';

const FriendsPremium = () => {
  const { user } = useAuthStore();
  const {
    data: approvedFriends,
    isLoading: isLoadingApproved,
    refetch: refetchApproved,
  } = useGetApprovedFriends(user?.id);

  console.log('approved', JSON.stringify(approvedFriends, null, 2));

  const { mutateAsync: sendFriendRequest, isPending: isSending } = useRequest();

  const [friendEmail, setFriendEmail] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSendRequest = async () => {
    if (!friendEmail.trim()) {
      fireToast.error('Please enter a valid email.');
      return;
    }
    await sendFriendRequest({
      userId: user?.id,
      friendEmail: friendEmail.trim(),
    });
    fireToast.success('Friend request sent successfully.');
    setFriendEmail('');
    setModalVisible(false);
  };

  return (
    <View>
      <Button onPress={() => setModalVisible(true)}>
        <Text>Add Friend</Text>
      </Button>

      <Button onPress={() => refetchApproved()}>
        <Text>Refresh approved</Text>
      </Button>
      <Button onPress={() => router.push('/(screens)/friends/pending')}>
        <Text>Pending</Text>
      </Button>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View className="bg-white p-4 rounded-lg">
          <Text className="text-lg font-bold mb-2">Add a Friend</Text>
          <Input
            placeholder="Enter email"
            value={friendEmail}
            onChangeText={setFriendEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Button disabled={isSending} onPress={handleSendRequest}>
            <Text> {isSending ? 'Sending...' : 'Add Friend'}</Text>
          </Button>
        </View>
      </Modal>

      <Text className="text-xl font-bold mt-4">Approved Friends</Text>
      {isLoadingApproved ? (
        <Loader visible />
      ) : approvedFriends.length === 0 ? (
        <NoData />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isLoadingApproved}
              onRefresh={refetchApproved}
            />
          }
          data={approvedFriends}
          keyExtractor={(item) => item.friendId}
          renderItem={({ item }) => (
            <View className="p-3 border-b">
              <Text>{item.friendUsername}</Text>
              <Text className="text-sm text-gray-500">
                Prayers: {JSON.stringify(item.pray)}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default FriendsPremium;
