import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import Loader from '@/components/shared/loader';
import NoData from '@/components/shared/no-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useAcceptRequest } from '@/hooks/friends/useAccept';
import { useCancelRequest } from '@/hooks/friends/useDelete';
import { useRequest } from '@/hooks/friends/useRequest';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { useGetPendingFriends } from '@/hooks/friends/useGetPending';
import { useGetApprovedFriends } from '@/hooks/friends/useGetApproved';

const FriendsPremium = () => {
  const { user } = useAuthStore();
  const {
    data: pendingFriends,
    isLoading: isLoadingPending,
    refetch: refetchPending,
  } = useGetPendingFriends(user?.id);
  const {
    data: approvedFriends,
    isLoading: isLoadingApproved,
    refetch: refetchApproved,
  } = useGetApprovedFriends(user?.id);

  console.log('pending', JSON.stringify(pendingFriends, null, 2));
  console.log('approved', JSON.stringify(approvedFriends, null, 2));

  const { mutateAsync: sendFriendRequest, isPending: isSending } = useRequest();
  const { mutateAsync: acceptFriendRequest, isPending: isAccepting } =
    useAcceptRequest();
  const { mutateAsync: cancelFriendRequest, isPending: isCancelling } =
    useCancelRequest();

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
    <View className="p-4">
      <Button onPress={() => setModalVisible(true)}>
        <Text>Add Friend</Text>
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

      <Text className="text-xl font-bold mt-4">Pending Friends</Text>
      {isLoadingPending ? (
        <Loader visible />
      ) : pendingFriends.length === 0 ? (
        <NoData />
      ) : (
        <FlatList
          data={pendingFriends}
          keyExtractor={(item) => item.friendId}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center p-3 border-b">
              <Text>{item.friendUsername}</Text>
              <View className="flex-row gap-2">
                <Button
                  disabled={isAccepting}
                  size="sm"
                  onPress={() =>
                    acceptFriendRequest({
                      userId: user?.id,
                      friendId: item.friendId,
                    })
                  }
                >
                  <Text>Accept</Text>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={isCancelling}
                  onPress={() =>
                    cancelFriendRequest({
                      userId: user?.id,
                      friendId: item.friendId,
                    })
                  }
                >
                  <Text>Decline</Text>
                </Button>
              </View>
            </View>
          )}
        />
      )}

      <Text className="text-xl font-bold mt-4">Approved Friends</Text>
      {isLoadingApproved ? (
        <Loader visible />
      ) : approvedFriends.length === 0 ? (
        <NoData />
      ) : (
        <FlatList
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
