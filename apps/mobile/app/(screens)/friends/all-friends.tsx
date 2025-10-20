import Checkbox from 'expo-checkbox';
import { router } from 'expo-router';
import { Search } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import Loader from '@/components/shared/loader';
import NoData from '@/components/shared/no-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { FRIENDS } from '@/constants/images';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';
import { fireToast } from '@/providers/toaster';
import GoBack from '@/components/shared/go-back';

import { useGetApprovedFriends } from '@/hooks/friends/useGetApproved';
import { useGetPendingFriends } from '@/hooks/friends/useGetPending';
import { useRequest } from '@/hooks/friends/useRequest';
import { useAcceptRequest } from '@/hooks/friends/useAccept';
import { useRejectRequest } from '@/hooks/friends/useReject';
import { useDeleteFriend } from '@/hooks/friends/useDelete';

const AllFriends = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { colors } = useThemeStore();
  const insets = useSafeAreaInsets();

  // ✅ Data hooks
  const {
    data: approvedFriends,
    isLoading: isLoadingApproved,
    refetch: refetchApproved,
  } = useGetApprovedFriends(user?.id ?? '');

  const {
    data: pendingFriends,
    isLoading: isLoadingPending,
    refetch: refetchPending,
  } = useGetPendingFriends(user?.id ?? '');

  const { mutateAsync: sendFriendRequest, isPending: isSending } = useRequest();
  const { mutateAsync: deleteFriend, isPending: isDeleting } = useDeleteFriend();
  const { mutateAsync: acceptFriendRequest, isPending: isAccepting } = useAcceptRequest();
  const { mutateAsync: rejectFriendRequest, isPending: isRejecting } = useRejectRequest();

  // ✅ Local state
  const [friendEmail, setFriendEmail] = useState('');

  // ✅ Add friend handler
  const handleSendRequest = async () => {
    if (!friendEmail.trim()) {
      fireToast.error(t('Friends.Pro.InvalidEmail'));
      return;
    }
    if (!user?.id) return;

    await sendFriendRequest({
      userId: user.id,
      friendEmail: friendEmail.trim(),
    });

    setFriendEmail('');
    refetchPending();
  };

  return (
    <SafeAreaView className="safe-area">
      <View className="main-area">
        <GoBack title={t('Friends.AllFriends')} />

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoadingApproved || isLoadingPending}
              onRefresh={() => {
                refetchApproved();
                refetchPending();
              }}
              tintColor={colors['--primary']}
            />
          }
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        >
          {/* Search/Add Friend */}
          <View className="flex-row items-center border border-border rounded-md mb-4">
            <View className="flex-1">
              <Input
                className="px-4 py-3 border-0"
                placeholder={t('Friends.Pro.SearchPlaceholder')}
                value={friendEmail}
                onChangeText={setFriendEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="send"
                autoCorrect={false}
                textContentType="emailAddress"
                autoComplete="email"
                onSubmitEditing={handleSendRequest}
              />
            </View>
            <Button
              variant="link"
              size="icon"
              onPress={handleSendRequest}
              disabled={isSending}
              className="px-3 border-l rounded-none border-input"
            >
              <Search size={24} color={colors['--foreground']} />
            </Button>
          </View>

          {/* Loader */}
          {(isLoadingApproved || isLoadingPending) && (
            <Loader visible className="mt-[100%] bg-transparent" />
          )}

          {/* Pending Requests (received) */}
          {!!pendingFriends?.data?.sentBy?.length && (
            <>
              <Text className="text-lg font-semibold mb-3">
                {t('Friends.Pro.ViewPending')}
              </Text>
              <View className="space-y-3">
                {pendingFriends.data.sentBy.map((item) => (
                  <View
                    key={item.id}
                    className="flex-col p-3 bg-card rounded-lg shadow-sm gap-3"
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
                          }).then(() => refetchPending())
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
                          }).then(() => refetchPending())
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
          {!!pendingFriends?.data?.requests?.length && (
            <>
              <Text className="text-lg font-semibold mt-4 mb-3">
                {t('Friends.Pro.SentRequests')}
              </Text>
              <View className="space-y-3">
                {pendingFriends.data.requests.map((item) => (
                  <View
                    key={item.id}
                    className="flex-col p-3 bg-card rounded-lg shadow-sm gap-3"
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
                          }).then(() => refetchPending())
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

          {/* Approved Friends */}
          {!!approvedFriends?.data?.length && (
            <>
              <Text className="text-lg font-semibold mt-4 mb-3">
                {t('Friends.Pro.FriendsList')}
              </Text>
              <View className="space-y-3">
                {approvedFriends.data.map((item) => (
                  <View
                    key={item.friend.id}
                    className="flex-col p-3 bg-card rounded-lg shadow-sm gap-3"
                  >
                    <View className="flex-row items-center gap-3">
                      <Image
                        source={{
                          uri: item.friend.photo || FRIENDS.guest,
                        }}
                        className="w-12 h-12 rounded-full bg-muted max-w-12 max-h-12"
                      />
                      <View>
                        <Text className="text-base font-medium text-muted-foreground">
                          {item.friend.username}
                        </Text>
                        <Text className="text-sm text-card-foreground">{item.friend.email}</Text>
                      </View>
                    </View>

                    <View className="flex-row gap-x-2 justify-end w-full">
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={isDeleting}
                        onPress={async () =>
                          await deleteFriend({
                            friendshipId: item.friend.friendshipId,
                            friendId: item.friend.id,
                          }).then(() => refetchApproved())
                        }
                      >
                        <Text>{t('Friends.Pro.Remove')}</Text>
                      </Button>
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* No Data */}
          {!approvedFriends?.data?.length &&
            !pendingFriends?.data?.sentBy?.length &&
            !pendingFriends?.data?.requests?.length && (
              <NoData title={t('Friends.Pro.NoFriends')} className="mt-[45%]" />
            )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AllFriends;




    // approvedFriends.data.map(friend => (
          //   <SwiperButton
          //     key={friend.friend.friendshipId}
          //     disabled={isDeleting || isSending}
          //     onPress={() =>
          //       deleteFriend({
          //         friendshipId: friend.friend.friendshipId,
          //         friendId: friend.friend.id,
          //       })
          //     }
          //   >
          //     <Accordion
          //       type="multiple"
          //       collapsible
          //       value={accordionValue}
          //       onValueChange={setAccordionValue}
          //     >
          //       <AccordionItem value={friend.friend.id}>
          //         <AccordionTrigger>
          //           <View className="flex-row items-center gap-3">
          //             <Image
          //               source={{ uri: friend.friend.photo }}
          //               className="size-14 rounded-full bg-muted max-w-14 max-h-14"
          //               defaultSource={FRIENDS.guest}
          //             />
          //             <View>
          //               <Text className="text-base font-medium text-muted-foreground">
          //                 {friend.friend.username}
          //               </Text>
          //               <Text className="text-sm">{friend.friend.email}</Text>
          //             </View>
          //           </View>
          //         </AccordionTrigger>
          //         <AccordionContent>
          //           {friend?.prays.length > 0 ? (
          //             [
          //               { name: SALAHS.FAJR, value: friend.prays[0].fajr },
          //               { name: SALAHS.DHUHR, value: friend.prays[0].dhuhr },
          //               { name: SALAHS.ASR, value: friend.prays[0].asr },
          //               { name: SALAHS.MAGHRIB, value: friend.prays[0].maghrib },
          //               { name: SALAHS.ISHA, value: friend.prays[0].isha },
          //               { name: SALAHS.NAFL, value: friend.prays[0].nafl },
          //             ].map(({ name, value }) => (
          //               <View key={name} className="flex-row items-center justify-between py-1">
          //                 <Text className={cn('capitalize font-semibold')}>
          //                   {t(`Commons.Salahs.${name}`)}
          //                 </Text>
          //                 <View className="flex-row gap-4">
          //                   {[PRAYER_POINTS.MISSED, PRAYER_POINTS.LATE, PRAYER_POINTS.ON_TIME].map(
          //                     val => (
          //                       <Checkbox
          //                         key={`${name}-${val}`}
          //                         value={value === val}
          //                         disabled
          //                         color={
          //                           value === val
          //                             ? val === PRAYER_POINTS.ON_TIME
          //                               ? colors['--primary']
          //                               : val === PRAYER_POINTS.LATE
          //                                 ? colors['--secondary']
          //                                 : colors['--destructive']
          //                             : undefined
          //                         }
          //                       />
          //                     )
          //                   )}
          //                 </View>
          //               </View>
          //             ))
          //           ) : (
          //             <Text className="text-sm text-muted-foreground text-center py-2">
          //               {t('Friends.Pro.NoPrayers')}
          //             </Text>
          //           )}
          //         </AccordionContent>
          //       </AccordionItem>
          //     </Accordion>
          //   </SwiperButton>
          // ))
