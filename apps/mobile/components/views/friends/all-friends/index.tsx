import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import GoBack from '@/components/shared/go-back';
import Loader from '@/components/shared/loader';
import NoData from '@/components/shared/no-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGetAllFriends } from '@/hooks/friends/member/useGetAllFriends';
import { useRequest } from '@/hooks/friends/member/useRequest';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';
import { FriendActivity } from '@/types/friends';

import FriendItem from './friend-item';
import Tabs from './tabs';
import { Search } from '@/components/shared/icons';

type TabKey = 'all' | 'requests' | 'friends';

const AllFriends: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { colors } = useThemeStore();
  const insets = useSafeAreaInsets();

  // Fetch data with infinite scroll
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } =
    useGetAllFriends(user?.id ?? '');

  // Mutations
  const { mutateAsync: sendFriendRequest, isPending: isSending } = useRequest();

  // Local state
  const [friendEmail, setFriendEmail] = useState('');
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  // Flatten paginated data
  const allActivities = useMemo(() => {
    return data?.pages.flatMap(page => page.data || []) || [];
  }, [data]);

  // Filter based on active tab
  const filteredActivities = useMemo(() => {
    if (activeTab === 'all') return allActivities;
    if (activeTab === 'requests') {
      return allActivities.filter(item => item.type === 'sent' || item.type === 'received');
    }
    return allActivities.filter(item => item.type === 'friend');
  }, [allActivities, activeTab]);

  // Count for tabs
  const counts = useMemo(() => {
    const requests = allActivities.filter(
      item => item.type === 'sent' || item.type === 'received'
    ).length;
    const friends = allActivities.filter(item => item.type === 'friend').length;
    return { requests, friends, all: allActivities.length };
  }, [allActivities]);

  // Handlers
  const handleSendRequest = useCallback(async () => {
    if (!user?.id) return;
    if (!z.email().safeParse(friendEmail.trim()).success)
      return fireToast.error(t('common.errors.invalidEmail'));

    await sendFriendRequest({
      userId: user.id,
      friendEmail: friendEmail.trim(),
    }).then(() => setFriendEmail(''));
  }, [user, friendEmail, sendFriendRequest, t]);

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const keyExtractor = useCallback(
    (item: FriendActivity, idx: number) => `${item.type}-${item.id}-${idx}`,
    []
  );

  const ListFooter = useMemo(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View className="py-4">
        <Loader visible />
      </View>
    );
  }, [isFetchingNextPage]);

  const ListEmpty = useMemo(() => {
    if (isLoading) return null;

    return (
      <Animated.View entering={FadeInDown.delay(150).springify()} className="mt-[35%]">
        <NoData
          title={
            activeTab === 'requests'
              ? t('friends.allFriends.noRequests')
              : activeTab === 'friends'
                ? t('friends.allFriends.noFriends')
                : t('friends.allFriends.noActivity')
          }
        />
      </Animated.View>
    );
  }, [activeTab, isLoading, t]);

  const RefetchControl = useMemo(
    () => (
      <RefreshControl
        refreshing={isLoading}
        onRefresh={onRefresh}
        tintColor={colors['--primary']}
      />
    ),
    [colors, isLoading, onRefresh]
  );

  return (
    <SafeAreaView className="safe-area">
      <View>
        {isLoading && <Loader visible className="absolute inset-0 bg-transparent z-50" />}
        <View className="px-4">
          <GoBack title={t('friends.allFriends.title')} />

          {/* Search/Add friend */}
          <View className="flex-row items-center border border-border rounded-lg mt-3 overflow-hidden">
            <View className="flex-1">
              <Input
                className="px-4 py-3 border-0"
                placeholder={t('friends.allFriends.searchPlaceholder')}
                value={friendEmail}
                onChangeText={setFriendEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="send"
                autoCorrect={false}
                textContentType="emailAddress"
                autoComplete="email"
                editable={!isSending}
                onSubmitEditing={handleSendRequest}
              />
            </View>
            <Button
              variant="link"
              size="icon"
              onPress={handleSendRequest}
              disabled={isSending}
              className="px-3 border-l rounded-none border-border"
            >
              <Search className="w-6 h-6 text-foreground" />
            </Button>
          </View>

          {/* Tabs */}
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            counts={counts}
            renderLabel={(tab, counts) => {
              if (tab === 'all') return t('friends.allFriends.all', { count: counts.all });
              if (tab === 'requests')
                return t('friends.allFriends.requests', { count: counts.requests });
              return t('friends.allFriends.friends', { count: counts.friends });
            }}
          />
        </View>
        <FlatList
          data={filteredActivities}
          keyExtractor={keyExtractor}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={ListFooter}
          refreshControl={RefetchControl}
          contentContainerStyle={{ paddingBottom: insets.bottom + 20, paddingTop: 10 }}
          renderItem={item => <FriendItem item={item.item} index={item.index} />}
          ListEmptyComponent={ListEmpty}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllFriends;
