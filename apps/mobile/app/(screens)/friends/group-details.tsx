import Checkbox from 'expo-checkbox';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, UserPlus, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
import Modal from '@/components/shared/modal';

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
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);

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
    });

    setShowAddMemberDialog(false);
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
    <>
      <View className="flex-1 bg-background px-4 pt-4">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-3 flex-1">
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={colors['--foreground']} />
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-xl font-bold">{params.groupName}</Text>
              <Text className="text-sm text-muted-foreground">
                {groupData?.members.length || 0} {t('Friends.Groups.Members')}
              </Text>
            </View>
          </View>
          <Button
            variant="outline"
            size="icon"
            onPress={() => setShowAddMemberDialog(true)}
            disabled={availableFriends.length === 0}
          >
            <UserPlus size={20} color={colors['--foreground']} />
          </Button>
        </View>

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
            <View className="gap-3">
              {groupData.members.map(member => (
                <View
                  key={member.id}
                  className="bg-card border border-border rounded-lg overflow-hidden"
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
                            <Image
                              source={{ uri: member.photo }}
                              className="size-14 rounded-full bg-muted"
                              defaultSource={FRIENDS.guest}
                            />
                            <View>
                              <Text className="text-base font-medium">{member.username}</Text>
                              <Text className="text-sm text-muted-foreground">{member.email}</Text>
                            </View>
                          </View>
                          <TouchableOpacity
                            onPress={e => {
                              e.stopPropagation();
                              handleRemoveMember(member.id);
                            }}
                            disabled={isRemoving}
                            className="p-2"
                          >
                            <Trash2 size={18} color={colors['--destructive']} />
                          </TouchableOpacity>
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
                </View>
              ))}
            </View>
          ) : (
            <NoData title={t('Friends.Groups.NoMembers')} className="mt-[45%]" />
          )}
        </ScrollView>
      </View>

      {/* Add Member Dialog */}
      <Modal visible={showAddMemberDialog} onRequestClose={() => setShowAddMemberDialog(false)}>
        <View>
          <ScrollView className="max-h-96">
            {availableFriends.map(friend => (
              <TouchableOpacity
                key={friend.friend.id}
                onPress={() => handleAddMember(friend.friend.id)}
                disabled={isAdding}
                className="flex-row items-center gap-3 p-3 border-b border-border"
              >
                <Image
                  source={{ uri: friend.friend.photo }}
                  className="size-12 rounded-full bg-muted"
                  defaultSource={FRIENDS.guest}
                />
                <View className="flex-1">
                  <Text className="font-medium">{friend.friend.username}</Text>
                  <Text className="text-sm text-muted-foreground">{friend.friend.email}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View>
            <Button variant="outline" onPress={() => setShowAddMemberDialog(false)}>
              <Text>{t('Commons.Cancel')}</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default GroupDetails;
