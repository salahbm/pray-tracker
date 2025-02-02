import { View, ScrollView, RefreshControl } from 'react-native';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import Loader from '@/components/shared/loader';
import NoData from '@/components/shared/no-data';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { FRIENDS } from '@/constants/images';
import { useAcceptRequest } from '@/hooks/friends/useAccept';
import { useCancelRequest } from '@/hooks/friends/useDelete';
import { useGetPendingFriends } from '@/hooks/friends/useGetPending';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';

const FriendsPending = () => {
  const { user } = useAuthStore();
  const { colors } = useThemeStore();
  const {
    data: pendingFriends,
    isLoading: isLoadingPending,
    refetch: refetchPending,
  } = useGetPendingFriends(user?.id);

  const { mutateAsync: acceptFriendRequest, isPending: isAccepting } =
    useAcceptRequest();
  const { mutateAsync: cancelFriendRequest, isPending: isCancelling } =
    useCancelRequest();

  return (
    <SafeAreaView className="safe-area">
      <GoBack title="Pending Requests" />

      <ScrollView
        className="main-area pb-10"
        refreshControl={
          <RefreshControl
            refreshing={isLoadingPending}
            onRefresh={refetchPending}
            tintColor={colors['--primary']}
          />
        }
      >
        <Text className="text-lg font-semibold mb-3">Friendship Requests</Text>

        {isLoadingPending ? (
          <Loader visible />
        ) : pendingFriends.length === 0 ? (
          <NoData />
        ) : (
          <View className="space-y-3">
            {pendingFriends.map((item) => (
              <View
                key={item.friendId}
                className="flex-row items-center justify-between p-3 bg-card rounded-lg shadow-sm"
              >
                <View className="flex-row items-center gap-3">
                  <Image
                    source={{
                      uri: item.friendAvatar || FRIENDS.guest,
                    }}
                    className="w-12 h-12 rounded-full bg-muted"
                  />
                  <View>
                    <Text className="text-base font-medium text-muted-foreground">
                      {item.friendUsername}
                    </Text>
                    <Text className="text-sm text-card-foreground">
                      {item.friendEmail}
                    </Text>
                  </View>
                </View>

                <View className="flex-row gap-x-2">
                  <Button
                    size="sm"
                    disabled={isAccepting}
                    onPress={() =>
                      acceptFriendRequest({
                        userId: user?.id,
                        friendId: item.friendId,
                      })
                    }
                  >
                    <Text>Confirm</Text>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isCancelling}
                    onPress={() =>
                      cancelFriendRequest({
                        userId: user?.id,
                        friendId: item.friendId,
                      })
                    }
                  >
                    <Text className="text-gray-600">Delete</Text>
                  </Button>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FriendsPending;
