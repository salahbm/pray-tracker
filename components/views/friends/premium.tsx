import Checkbox from 'expo-checkbox';
import { router } from 'expo-router';
import { Search, Users } from 'lucide-react-native';
import { useState } from 'react';
import { View, RefreshControl, ScrollView, Image } from 'react-native';

import Loader from '@/components/shared/loader';
import NoData from '@/components/shared/no-data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { PRAYER_POINTS } from '@/constants/enums';
import { FRIENDS } from '@/constants/images';
import { useGetApprovedFriends } from '@/hooks/friends/useGetApproved';
import { useRequest } from '@/hooks/friends/useRequest';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';

const FriendsApproved = () => {
  const { user } = useAuthStore();
  const { colors } = useThemeStore();
  const {
    data: approvedFriends,
    isLoading: isLoadingApproved,
    refetch: refetchApproved,
  } = useGetApprovedFriends(user?.id);
  console.log('approvedFriends:', JSON.stringify(approvedFriends, null, 2));

  const { mutateAsync: sendFriendRequest, isPending: isSending } = useRequest();
  const [friendEmail, setFriendEmail] = useState('');
  const [accordionValue, setAccordionValue] = useState<string[] | null>(null);

  const handleSendRequest = async () => {
    if (!friendEmail.trim()) {
      fireToast.error('Please enter a valid email.');
      return;
    }
    await sendFriendRequest({
      userId: user?.id,
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
    >
      {/* Header Buttons */}
      <View className="flex-row flex justify-between items-center mb-4">
        <Input
          placeholder="Enter email"
          value={friendEmail}
          onChangeText={setFriendEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="send"
          onSubmitEditing={handleSendRequest}
          className="w-1/2"
        />
        <View className="flex-row gap-4">
          <Button
            variant="link"
            size="icon"
            onPress={handleSendRequest}
            disabled={isSending}
          >
            <Search size={24} color="black" />
          </Button>
          <Button
            variant="link"
            size="icon"
            onPress={() => router.push('/(screens)/friends/pending')}
          >
            <Users size={24} color="black" />
          </Button>
        </View>
      </View>

      {/* Approved Friends List */}
      <Text className="text-xl font-bold mb-3">Approved Friends</Text>
      {isLoadingApproved ? (
        <Loader visible className="mt-[45%]" />
      ) : approvedFriends.length === 0 ? (
        <NoData className="mt-[45%]" />
      ) : (
        approvedFriends.map(({ friend, prays }) => (
          <Accordion
            key={friend.id}
            type="multiple"
            collapsible
            value={accordionValue}
            onValueChange={setAccordionValue}
          >
            <AccordionItem value={friend.id}>
              <AccordionTrigger>
                <View className="flex-row items-center gap-3">
                  <Image
                    source={{ uri: friend.photo || FRIENDS.guest }}
                    className="w-12 h-12 rounded-full bg-muted"
                  />
                  <View>
                    <Text className="text-base font-medium text-muted-foreground">
                      {friend.username}
                    </Text>
                    <Text className="text-sm text-card-foreground">
                      {friend.email}
                    </Text>
                  </View>
                </View>
              </AccordionTrigger>
              <AccordionContent>
                {prays.map((salah) => {
                  // Extract only the prayer-related fields
                  const prayerEntries = Object.entries(salah).filter(([key]) =>
                    [
                      'fajr',
                      'dhuhr',
                      'asr',
                      'maghrib',
                      'isha',
                      'tahajjud',
                    ].includes(key),
                  );

                  return prayerEntries.map(([prayer, value]) => (
                    <View
                      key={`${salah.id}-${prayer}`}
                      className="flex-row items-center justify-between py-1"
                    >
                      <Text className="capitalize font-semibold">{prayer}</Text>
                      <View className="flex-1 flex-row justify-end">
                        {[
                          PRAYER_POINTS.MISSED,
                          PRAYER_POINTS.LATE,
                          PRAYER_POINTS.ON_TIME,
                        ].map((val) => (
                          <Checkbox
                            key={`${salah.id}-${prayer}-${val}`}
                            value={val === value}
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
                        ))}
                      </View>
                    </View>
                  ));
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))
      )}
    </ScrollView>
  );
};

export default FriendsApproved;
