import Checkbox from 'expo-checkbox';
import { router } from 'expo-router';
import { Search, Users } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, RefreshControl, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Loader from '@/components/shared/loader';
import NoData from '@/components/shared/no-data';
import SwiperButton from '@/components/shared/swiper';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { PRAYER_POINTS, SALAHS } from '@/constants/enums';
import { FRIENDS } from '@/constants/images';
import { useDeleteFriend } from '@/hooks/friends/useDelete';
import { useGetApprovedFriends } from '@/hooks/friends/useGetApproved';
import { useRequest } from '@/hooks/friends/useRequest';
import { cn } from '@/lib/utils';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';

const FriendsApproved = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { colors } = useThemeStore();
  const insets = useSafeAreaInsets();
  const {
    data: approvedFriends,
    isLoading: isLoadingApproved,
    refetch: refetchApproved,
  } = useGetApprovedFriends(user?.id ?? '');
  const { mutateAsync: sendFriendRequest, isPending: isSending } = useRequest();
  const { mutateAsync: deleteFriend, isPending: isDeleting } = useDeleteFriend();
  const [friendEmail, setFriendEmail] = useState('');
  const [accordionValue, setAccordionValue] = useState<string[]>([]);
  const handleSendRequest = async () => {
    if (!friendEmail.trim()) {
      fireToast.error(t('Friends.Pro.InvalidEmail'));
      return;
    }
    if (!user?.id) return;

    await sendFriendRequest({
      userId: user.id,
      friendEmail: friendEmail.trim(),
    }).then(() => {
      setFriendEmail('');
    });
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isLoadingApproved}
          onRefresh={refetchApproved}
          tintColor={colors['--primary']}
        />
      }
      contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}
    >
      {/* Header Buttons */}
      <View className="flex-row flex justify-between items-center mb-4 gap-4">
        <View className="flex-row items-center border border-border rounded-md flex-1">
          <View className="flex-1">
            <Input
              className="px-4 py-2 border-0"
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

        <Button
          variant="link"
          size="icon"
          onPress={() => router.push('/(screens)/friends/pending')}
        >
          <Users size={24} color={colors['--foreground']} />
        </Button>
      </View>

      {/* Approved Friends List */}
      <Text className="text-xl font-bold mb-3">{t('Friends.Title')}</Text>
      {isLoadingApproved ? (
        <Loader visible className="mt-[100%] bg-transparent" />
      ) : approvedFriends?.data && approvedFriends.data.length > 0 ? (
        approvedFriends?.data.map(friend => (
          <SwiperButton
            key={friend.friend.friendshipId}
            disabled={isDeleting || isSending}
            onPress={() =>
              deleteFriend({
                friendshipId: friend.friend.friendshipId,
                friendId: friend.friend.id,
              })
            }
          >
            <Accordion
              type="multiple"
              collapsible
              value={accordionValue}
              onValueChange={setAccordionValue}
            >
              <AccordionItem value={friend.friend.id}>
                <AccordionTrigger>
                  <View className="flex-row items-center gap-3">
                    <Image
                      source={{
                        uri: friend.friend.photo,
                      }}
                      className="size-14 rounded-full bg-muted max-w-14 max-h-14"
                      defaultSource={FRIENDS.guest}
                    />

                    <View>
                      <Text className="text-base font-medium text-muted-foreground">
                        {friend.friend.username}
                      </Text>
                      <Text className="text-sm">{friend.friend.email}</Text>
                    </View>
                  </View>
                </AccordionTrigger>
                <AccordionContent>
                  {friend?.prays.length > 0 ? (
                    [
                      { name: SALAHS.FAJR, value: friend.prays[0].fajr },
                      { name: SALAHS.DHUHR, value: friend.prays[0].dhuhr },
                      { name: SALAHS.ASR, value: friend.prays[0].asr },
                      { name: SALAHS.MAGHRIB, value: friend.prays[0].maghrib },
                      { name: SALAHS.ISHA, value: friend.prays[0].isha },
                      { name: SALAHS.NAFL, value: friend.prays[0].nafl },
                    ].map(({ name, value }) => (
                      <View key={name} className="flex-row items-center justify-between py-1">
                        <Text className={cn('capitalize font-semibold')}>
                          {t(`Commons.Salahs.${name}`)}
                        </Text>

                        <View className="flex-row gap-4">
                          {[PRAYER_POINTS.MISSED, PRAYER_POINTS.LATE, PRAYER_POINTS.ON_TIME].map(
                            val => (
                              <Checkbox
                                key={`${name}-${val}`}
                                value={value === val}
                                disabled
                                color={
                                  value === val
                                    ? val === PRAYER_POINTS.ON_TIME
                                      ? colors['--primary']
                                      : val === PRAYER_POINTS.LATE
                                        ? colors['--secondary']
                                        : colors['--destructive']
                                    : undefined
                                }
                              />
                            )
                          )}
                        </View>
                      </View>
                    ))
                  ) : (
                    <Text className="text-sm text-muted-foreground text-center py-2">
                      {t('Friends.Pro.NoPrayers')}
                    </Text>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SwiperButton>
        ))
      ) : (
        <NoData title={t('Friends.Pro.NoFriends')} className="mt-[45%]" />
      )}
    </ScrollView>
  );
};

export default FriendsApproved;
