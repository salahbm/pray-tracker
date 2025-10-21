import { router } from 'expo-router';
import { FolderPlus, Users, ChevronRight, Edit2, Sparkles } from 'lucide-react-native';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView, View, Image, Pressable } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeOutLeft,
  LinearTransition,
  ZoomIn,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Loader from '@/components/shared/loader';
import NoData from '@/components/shared/no-data';
import { Text } from '@/components/ui/text';
import { FRIENDS } from '@/constants/images';
import { useGetGroups } from '@/hooks/friends/group/useGetGroups';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';
import { useFriendsBottomSheetStore } from '@/store/bottom-sheets/friends.store';
import SwiperButton from '@/components/shared/swiper';

const FriendsGroups = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { colors } = useThemeStore();
  const insets = useSafeAreaInsets();

  const { data: groups, isLoading, refetch } = useGetGroups(user?.id ?? '');
  const { createSheetRef, editSheetRef, deleteSheetRef, setGroupName, setSelectedGroup } =
    useFriendsBottomSheetStore();

  const openEditSheet = (group: { id: string; name: string }) => {
    setSelectedGroup(group);
    setGroupName(group.name);
    editSheetRef.current?.snapToIndex(0);
  };

  const openDeleteSheet = (group: { id: string; name: string }) => {
    setSelectedGroup(group);
    deleteSheetRef.current?.snapToIndex(0);
  };

  return (
    <Fragment>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor={colors['--primary']}
          />
        }
        contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}
      >
        {/* Header */}
        <Animated.View
          entering={FadeInDown.duration(400)}
          className="flex-row justify-between items-center mb-6"
        >
          <View>
            <Text className="text-2xl font-bold">{t('Friends.Groups.Title')}</Text>
            <Text className="text-sm text-muted-foreground mt-1">
              {t('Friends.Groups.GroupsCount', { count: groups?.length || 0 })}
            </Text>
          </View>
          <View className="flex-row gap-2">
            <Pressable
              onPress={() => createSheetRef.current?.snapToIndex(0)}
              className="bg-primary rounded-full p-3 active:opacity-80"
            >
              <FolderPlus size={22} color={colors['--primary-foreground']} />
            </Pressable>
            <Pressable
              onPress={() => router.push('/(screens)/friends/all-friends')}
              className="bg-card border border-border rounded-full p-3 active:opacity-80"
            >
              <Users size={22} color={colors['--foreground']} />
            </Pressable>
          </View>
        </Animated.View>

        {/* Groups List */}
        {isLoading ? (
          <Loader visible className="pt-[50%] bg-transparent" />
        ) : groups && groups.length > 0 ? (
          <Animated.View className="gap-4" layout={LinearTransition.springify()}>
            {groups.map((group, index) => (
              <Animated.View
                key={group.id}
                entering={FadeInRight.delay(index * 100).springify()}
                exiting={FadeOutLeft.springify()}
                layout={LinearTransition.springify()}
              >
              
                  <Pressable
                    onPress={() =>
                      router.push({
                        pathname: '/(screens)/friends/group-details',
                        params: { groupId: group.id, groupName: group.name },
                      })
                    }
                    className="bg-card border border-border rounded-2xl p-5 active:opacity-90"
                    style={{
                      shadowColor: colors['--primary'],
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.05,
                      shadowRadius: 8,
                      elevation: 2,
                    }}
                  >  
                  <SwiperButton
                  key={group.id}
                  onPress={() => openDeleteSheet(group)}
                  title="Delete"
                  variant="destructive"
                >
                    <View className="flex-row items-center justify-between">
                      <View className="flex-1">
                        {/* Group Header */}
                        <View className="flex-row items-center gap-3 mb-3">
                          <View className="bg-primary/10 p-3 rounded-xl">
                            <Sparkles size={20} color={colors['--primary']} />
                          </View>
                          <View className="flex-1">
                            <Text className="text-lg font-bold">{group.name}</Text>
                            <View className="flex-row items-center gap-2 mt-1">
                              <View className="bg-primary/15 py-1 rounded-full">
                                <Text className="text-xs text-primary font-semibold">
                                  {t('Friends.Groups.MembersCount', { count: group.memberCount })}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>

                      </View>

                      {/* Action Buttons */}
                      <View className="flex-row items-center gap-1 ml-2">
                        <Pressable
                          onPress={e => {
                            e.stopPropagation();
                            openEditSheet({ id: group.id, name: group.name });
                          }}
                          className="p-2.5 bg-muted/50 rounded-xl active:opacity-70"
                        >
                          <Edit2 size={18} color={colors['--muted-foreground']} />
                        </Pressable>

                        <ChevronRight size={20} color={colors['--muted-foreground']} />
                      </View>
                    </View>


                        {/* Member Avatars Preview */}
                        {group.members.length > 0 && (
                          <View className="flex-row items-center gap-1">
                            {group.members.slice(0, 4).map((member, idx) => (
                              <Animated.View
                                key={member.id}
                                entering={ZoomIn.delay(idx * 50)}
                                className={cn(idx > 0 && '-ml-3')}
                              >
                                <Image
                                  source={{ uri: member.photo ?? FRIENDS.guest }}
                                  className="size-10 rounded-full bg-muted border-2 border-card"
                                  defaultSource={FRIENDS.guest}
                                />
                              </Animated.View>
                            ))}
                            {group.memberCount > 4 && (
                              <Animated.View
                                entering={ZoomIn.delay(200)}
                                className="size-10 rounded-full bg-primary/20 border-2 border-card -ml-3 items-center justify-center"
                              >
                                <Text className="text-xs text-primary font-bold">
                                  +{group.memberCount - 4}
                                </Text>
                              </Animated.View>
                            )}
                          </View>
                        )}
                </SwiperButton>
                  </Pressable>
              </Animated.View>
            ))}
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInDown.delay(200)}>
            <NoData title={t('Friends.Groups.NoGroups')} className="mt-[45%]" />
          </Animated.View>
        )}
      </ScrollView>
    </Fragment>
  );
};

export default FriendsGroups;
