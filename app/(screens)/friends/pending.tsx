import { View, ScrollView, RefreshControl } from 'react-native';
import { Image } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import Loader from '@/components/shared/loader';
import NoData from '@/components/shared/no-data';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { FRIENDS } from '@/constants/images';
import { useAcceptRequest } from '@/hooks/friends/useAccept';
import { useGetPendingFriends } from '@/hooks/friends/useGetPending';
import { useRejectRequest } from '@/hooks/friends/useReject';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';

const FriendsPending = () => {
  const { user } = useAuthStore();
  const { colors } = useThemeStore();
  const insets = useSafeAreaInsets();
  const {
    data: pendingFriends,
    isLoading: isLoadingPending,
    refetch: refetchPending,
  } = useGetPendingFriends(user?.id);
  console.log('pendingFriends:', pendingFriends);

  const { mutateAsync: acceptFriendRequest, isPending: isAccepting } =
    useAcceptRequest();
  const { mutateAsync: rejectFriendRequest, isPending: isRejecting } =
    useRejectRequest();

  return (
    <SafeAreaView className="safe-area">
      <ScrollView
        className="main-area"
        refreshControl={
          <RefreshControl
            refreshing={isLoadingPending}
            onRefresh={refetchPending}
            tintColor={colors['--primary']}
          />
        }
        contentContainerStyle={{
          paddingBottom: insets.bottom + 50,
        }}
      >
        <GoBack title="Pending Requests" />

        <Text
          className={cn(
            'text-lg font-semibold mb-3',
            pendingFriends?.length > 0 ? 'block' : 'hidden',
          )}
        >
          Friendship Requests
        </Text>

        {isLoadingPending ? (
          <Loader visible className="bg-transparent mt-[45%]" />
        ) : Array.isArray(pendingFriends) && pendingFriends.length > 0 ? (
          <View className="space-y-3">
            {pendingFriends &&
              pendingFriends?.map((item) => (
                <View
                  key={item.friendId}
                  className="flex-col items-start justify-between p-3 bg-card rounded-lg shadow-sm gap-3"
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

                  <View className="flex-row gap-x-2 justify-end w-full">
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={isRejecting}
                      onPress={async () =>
                        await rejectFriendRequest({
                          userId: user?.id,
                          friendId: item.id,
                        })
                      }
                    >
                      <Text>Reject</Text>
                    </Button>
                    <Button
                      size="sm"
                      disabled={isAccepting}
                      onPress={async () =>
                        await acceptFriendRequest({
                          friendshipId: item.id,
                          friendId: item.friendId,
                          userId: item.userId,
                        })
                      }
                    >
                      <Text>Accept</Text>
                    </Button>
                  </View>
                </View>
              ))}
          </View>
        ) : (
          <NoData title="No pending requests" className="mt-[55%]" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FriendsPending;
