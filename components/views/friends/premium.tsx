import React, { useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Loader from '@/components/shared/loader';
import NoData from '@/components/shared/no-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useAcceptRequest } from '@/hooks/friends/useAccept';
import { useCancelRequest } from '@/hooks/friends/useDelete';
import { useGetFriends } from '@/hooks/friends/useGetFriends';
import { useSendRequest } from '@/hooks/friends/useSendRequest';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';

const FriendsPremium = () => {
  const { user } = useAuthStore();
  const { data: friends, isLoading } = useGetFriends(user?.id);
  const { mutateAsync: sendFriendRequest, isPending: isSending } =
    useSendRequest();
  const { mutateAsync: acceptFriendRequest, isPending: isAccepting } =
    useAcceptRequest();
  const { mutateAsync: cancelFriendRequest, isPending: isCancelling } =
    useCancelRequest(); // Use cancel mutation

  const [friendEmail, setFriendEmail] = useState('');

  const handleSendRequest = async () => {
    if (!friendEmail.trim()) {
      fireToast.error('Please enter a valid email.');
      return;
    }

    const payload = {
      userId: user?.id,
      friendEmail: friendEmail.trim(),
    };
    await sendFriendRequest(payload);
    fireToast.success('Friend request sent successfully.');
    setFriendEmail('');
  };

  const handleCancelRequest = async (friendId: string) => {
    await cancelFriendRequest({ userId: user?.id, friendId });
  };

  return (
    <React.Fragment>
      {/* Add Friend Section */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Add a Friend</Text>
        <Input
          className="border p-2 rounded-lg mb-2"
          placeholder="Enter email"
          value={friendEmail}
          onChangeText={setFriendEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <Button disabled={isSending} onPress={handleSendRequest}>
          <Text> {isSending ? 'Sending...' : 'Add Friend'}</Text>
        </Button>
      </View>

      {/* Friends List */}
      <View className="flex-1">
        <Text className="text-xl font-bold mb-2">Your Friends</Text>

        {isLoading ? (
          <Loader visible className="bg-transparent" />
        ) : friends?.length === 0 ? (
          <NoData />
        ) : (
          <FlatList
            data={friends}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="flex-row justify-between p-3 border-b items-center">
                <Text className="text-lg">{item.username}</Text>

                {item.status === 'pending' ? (
                  <View className="flex-row space-x-2">
                    <Button
                      disabled={isAccepting}
                      onPress={() =>
                        acceptFriendRequest({
                          userId: user?.id,
                          friendId: item.id,
                        })
                      }
                    >
                      <Text> {isAccepting ? 'Accepting...' : 'Accept'}</Text>
                    </Button>
                    <Button
                      variant="destructive"
                      disabled={isCancelling}
                      onPress={() => handleCancelRequest(item.id)}
                    >
                      <Text> {isCancelling ? 'Cancelling...' : 'Cancel'}</Text>
                    </Button>
                  </View>
                ) : (
                  <Text className="text-green-600">✔️ Accepted</Text>
                )}
              </View>
            )}
            ListFooterComponent={<View style={{ height: 50 }} />}
          />
        )}
      </View>
    </React.Fragment>
  );
};

export default FriendsPremium;
