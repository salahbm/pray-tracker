import { useTranslation } from 'react-i18next';
import { Image, RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import Loader from '@/components/shared/loader';
import NoData from '@/components/shared/no-data';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { FRIENDS } from '@/constants/images';
import { useAcceptRequest } from '@/hooks/friends/useAccept';
import { useGetPendingFriends } from '@/hooks/friends/useGetPending';
import { useRejectRequest } from '@/hooks/friends/useReject';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';

const FriendsPending = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { colors } = useThemeStore();
  const insets = useSafeAreaInsets();

  const {
    data: pendingFriends,
    isLoading: isLoadingPending,
    refetch: refetchPending,
  } = useGetPendingFriends(user?.id);

  const { mutateAsync: acceptFriendRequest, isPending: isAccepting } = useAcceptRequest();
  const { mutateAsync: rejectFriendRequest, isPending: isRejecting } = useRejectRequest();

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
        <GoBack title={t('Friends.Pro.PendingTitle')} />

        {isLoadingPending ? (
          <Loader visible className="bg-transparent mt-[100%]" />
        ) : pendingFriends?.data &&
          (pendingFriends.data.sentBy.length > 0 || pendingFriends.data.requests.length > 0) ? (
          <>
            {/* Received Requests */}
            {pendingFriends.data.sentBy.length > 0 && (
              <>
                <Text className="text-lg font-semibold mb-3">{t('Friends.Pro.ViewPending')}</Text>
                <View className="space-y-3">
                  {pendingFriends.data.sentBy.map(item => (
                    <View
                      key={item.id}
                      className="flex-col items-start justify-between p-3 bg-card rounded-lg shadow-sm gap-3"
                    >
                      <View className="flex-row items-center gap-3">
                        <Image
                          source={{
                            uri: item?.photo,
                          }}
                          className="w-12 h-12 rounded-full bg-muted max-w-12 max-h-12"
                          defaultSource={FRIENDS.guest}
                        />

                        <View>
                          <Text className="text-base font-medium text-muted-foreground">
                            {item.username}
                          </Text>
                          <Text className="text-sm text-card-foreground">{item.email}</Text>
                        </View>
                      </View>

                      <View className="flex-row gap-x-2 justify-end w-full">
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={isRejecting}
                          onPress={async () =>
                            await rejectFriendRequest({
                              friendshipId: item.id,
                              friendId: item.friendId,
                              userId: item.userId,
                            })
                          }
                        >
                          <Text>{t('Friends.Pro.Reject')}</Text>
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
                          <Text>{t('Friends.Pro.Accept')}</Text>
                        </Button>
                      </View>
                    </View>
                  ))}
                </View>
              </>
            )}

            {/* Sent Requests */}
            {pendingFriends.data.requests.length > 0 && (
              <>
                <Text className="text-lg font-semibold mt-2 mb-3">
                  {t('Friends.Pro.SentRequests')}
                </Text>
                <View className="space-y-3">
                  {pendingFriends.data.requests.map(item => (
                    <View
                      key={item.id}
                      className="flex-col items-start justify-between p-3 bg-card rounded-lg shadow-sm gap-3"
                    >
                      <View className="flex-row items-center gap-3">
                        <Image
                          source={{
                            uri: item.photo || FRIENDS.guest,
                          }}
                          className="w-12 h-12 rounded-full bg-muted max-w-12 max-h-12"
                        />
                        <View>
                          <Text className="text-base font-medium text-muted-foreground">
                            {item.username}
                          </Text>
                          <Text className="text-sm text-card-foreground">{item.email}</Text>
                        </View>
                      </View>

                      <View className="flex-row gap-x-2 justify-end w-full">
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={isRejecting}
                          onPress={async () =>
                            await rejectFriendRequest({
                              friendshipId: item.id,
                              friendId: item.friendId,
                              userId: item.userId,
                            })
                          }
                        >
                          <Text>{t('Friends.Pro.Cancel')}</Text>
                        </Button>
                      </View>
                    </View>
                  ))}
                </View>
              </>
            )}
          </>
        ) : (
          <NoData title={t('Friends.Pro.NoPending')} className="mt-[55%]" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FriendsPending;
