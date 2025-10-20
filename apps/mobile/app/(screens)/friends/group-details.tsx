import BottomSheet from '@gorhom/bottom-sheet';
import Checkbox from 'expo-checkbox';
import { router, useLocalSearchParams } from 'expo-router';
import { UserPlus, Trash2, Users, Sparkles } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, RefreshControl, ScrollView, TouchableOpacity, View, Pressable } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInRight,
  Layout,
  LinearTransition,
  ZoomIn,
} from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomBottomSheet from '@/components/shared/bottom-sheet';
import GoBack from '@/components/shared/go-back';
import Loader from '@/components/shared/loader';
import NoData from '@/components/shared/no-data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { PRAYER_POINTS, SALAHS } from '@/constants/enums';
import { FRIENDS } from '@/constants/images';
import { useAddMember } from '@/hooks/friends/useAddMember';
import { useGetApprovedFriends } from '@/hooks/friends/useGetApproved';
import { useGetGroupMembers } from '@/hooks/friends/useGetGroupMembers';
import { useRemoveMember } from '@/hooks/friends/useRemoveMember';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';
import { Ionicons } from '@expo/vector-icons';

const GroupDetails = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { colors } = useThemeStore();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ groupId: string; groupName: string }>();


  const {
    data: groupData,
    isLoading,
    refetch,
  } = useGetGroupMembers(params.groupId, user?.id ?? '');

  const { data: allFriends } = useGetApprovedFriends(user?.id ?? '');

  const { mutateAsync: addMember, isPending: isAdding } = useAddMember();
  const { mutateAsync: removeMember, isPending: isRemoving } = useRemoveMember();

  const [accordionValue, setAccordionValue] = useState<string[]>([]);
  const addMemberSheetRef = useRef<BottomSheet>(null);

  // Get friends that are not in this group
  const availableFriends =
    allFriends?.data?.filter(
      friend => !groupData?.members.some(member => member.userId === friend.friend.id)
    ) || [];

  const handleAddMember = async (friendId: string) => {
    if (!user?.id) return;


      await addMember({
        groupId: params.groupId,
        friendId,
        userId: user.id,
      }).then(() => {
        addMemberSheetRef.current?.close();
      });
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!user?.id) return;


      await removeMember({
        groupId: params.groupId,
        memberId,
        userId: user.id,
      });
  
  };

  return (
    <SafeAreaView className="safe-area">
      <View className="main-area">
        {/* Header */}

        <Animated.View
          entering={FadeInDown.duration(400)}
          className="flex-row justify-between items-center mb-6"
        >
            <View className="flex-row items-center gap-2 flex-1">
            <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 justify-center items-start"
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={24} color={colors['--primary']} />
        </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-2xl font-bold">{params.groupName}</Text>
              <Text className="text-sm text-muted-foreground mt-1">
                {groupData?.members.length || 0} {groupData?.members.length === 1 ? 'member' : 'members'}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => addMemberSheetRef.current?.snapToIndex(0)}
            className="bg-primary rounded-full p-3"
          >
            <UserPlus size={22} color={colors['--primary-foreground']} />
          </Pressable>
        </Animated.View>


        {/* Members List */}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refetch}
              tintColor={colors['--primary']}
            />
          }
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        >
          {isLoading ? (
           <Loader visible className="mt-[100%] bg-transparent" />
          ) : groupData?.members && groupData.members.length > 0 ? (
            <Animated.View className="gap-4" layout={LinearTransition.springify()}>
              {groupData.members.map((member, index) => (
                <Animated.View
                  key={member.id}
                  entering={FadeInRight.delay(index * 100).springify()}
                  layout={LinearTransition.springify()}
                  className="bg-card border border-border rounded-2xl overflow-hidden"
                  style={{
                    shadowColor: colors['--primary'],
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                    elevation: 2,
                  }}
                >
                  <Accordion
                    type="multiple"
                    collapsible
                    value={accordionValue}
                    onValueChange={setAccordionValue}
                  >
                    <AccordionItem value={member.userId}>
                      <AccordionTrigger>
                        <View className="flex-row items-center justify-between flex-1 pr-2">
                          <View className="flex-row items-center gap-3">
                            <Animated.View entering={ZoomIn.delay(index * 50)}>
                              <Image
                                source={{ uri: member.photo }}
                                className="size-14 rounded-full bg-muted border-2 border-primary/10"
                                defaultSource={FRIENDS.guest}
                              />
                            </Animated.View>
                            <View>
                              <Text className="text-base font-bold">{member.username}</Text>
                              <Text className="text-sm text-muted-foreground">{member.email}</Text>
                            </View>
                          </View>
                          <Pressable
                            onPress={e => {
                              e.stopPropagation();
                              handleRemoveMember(member.id);
                            }}
                            disabled={isRemoving}
                            className="p-2.5 bg-destructive/10 rounded-xl active:opacity-70"
                          >
                            <Trash2 size={18} color={colors['--destructive']} />
                          </Pressable>
                        </View>
                      </AccordionTrigger>
                      <AccordionContent>
                        {member.prays.length > 0 ? (
                          [
                            { name: SALAHS.FAJR, value: member.prays[0].fajr },
                            { name: SALAHS.DHUHR, value: member.prays[0].dhuhr },
                            { name: SALAHS.ASR, value: member.prays[0].asr },
                            { name: SALAHS.MAGHRIB, value: member.prays[0].maghrib },
                            { name: SALAHS.ISHA, value: member.prays[0].isha },
                            { name: SALAHS.NAFL, value: member.prays[0].nafl },
                          ].map(({ name, value }) => (
                            <View key={name} className="flex-row items-center justify-between py-1">
                              <Text className="capitalize font-semibold">
                                {t(`Commons.Salahs.${name}`)}
                              </Text>
                              <View className="flex-row gap-4">
                                {[
                                  PRAYER_POINTS.MISSED,
                                  PRAYER_POINTS.LATE,
                                  PRAYER_POINTS.ON_TIME,
                                ].map(val => (
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
                                ))}
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
                </Animated.View>
              ))}
            </Animated.View>
          ) : (
            <Animated.View entering={FadeInDown.delay(200)}>
              <NoData title={t('Friends.Groups.NoMembers')} className="mt-[45%]" />
            </Animated.View>
          )}
        </ScrollView>
      </View>

      {/* Add Member Bottom Sheet */}
      <CustomBottomSheet sheetRef={addMemberSheetRef} snapPoints={['70%']}>
        <View className="gap-4 pb-8">
          <View className="items-center mb-2">
            <View className="bg-primary/10 p-4 rounded-full mb-3">
              <UserPlus size={32} color={colors['--primary']} />
            </View>
            <Text className="text-2xl font-bold text-center">
              {t('Friends.Groups.AddMember')}
            </Text>
            <Text className="text-sm text-muted-foreground text-center mt-2 px-4">
              {availableFriends.length} {t('Friends.Pro.FriendsAvailable', { count: availableFriends.length })}
            </Text>
          </View>

          <ScrollView className="max-h-96" showsVerticalScrollIndicator={false}>
            {availableFriends.length > 0 ? (
              <View className="gap-2">
                {availableFriends.map((friend, index) => (
                  <Animated.View
                    key={friend.friend.id}
                    entering={FadeInRight.delay(index * 50).springify()}
                  >
                    <Pressable
                      onPress={() => handleAddMember(friend.friend.id)}
                      disabled={isAdding}
                      className="flex-row items-center gap-3 p-4 bg-card border border-border rounded-xl active:opacity-80"
                    >
                      <Image
                        source={{ uri: friend.friend.photo }}
                        className="size-12 rounded-full bg-muted"
                        defaultSource={FRIENDS.guest}
                      />
                      <View className="flex-1">
                        <Text className="font-bold">{friend.friend.username}</Text>
                        <Text className="text-sm text-muted-foreground">{friend.friend.email}</Text>
                      </View>
                      <View className="bg-primary/10 p-2 rounded-full">
                        <UserPlus size={18} color={colors['--primary']} />
                      </View>
                    </Pressable>
                  </Animated.View>
                ))}
              </View>
            ) : (
              <View className="items-center py-8">
                <Users size={48} color={colors['--muted-foreground']} />
                <Text className="text-muted-foreground mt-4 text-center">
                  {t('Friends.Groups.NoAvailableFriends')}
                </Text>

                
              </View>
            )}
          </ScrollView>

          <Button
            variant="outline"
            onPress={() => addMemberSheetRef.current?.close()}
            className="mt-2"
          >
            <Text>{t('Commons.Cancel')}</Text>
          </Button>
        </View>
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default GroupDetails;
