import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Loader from '@/components/shared/loader';
import Modal from '@/components/shared/modal';
import NoData from '@/components/shared/no-data';
import { Text } from '@/components/ui/text';
import { FRIENDS } from '@/constants/images';
import { useGetGlobalLeaderboard } from '@/hooks/leaderboard';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';
import { TUser } from '@/types/user';
import { X } from 'lucide-react-native';
import Image from '@/components/ui/image';

export default function Leaderboard({
  showCount,
  imageClassName,
}: {
  showCount: boolean;
  imageClassName?: string;
}) {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();
  const { colors } = useThemeStore();

  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

  const { data, isLoading, refetch } = useGetGlobalLeaderboard(1, showCount ? 10 : 100);

  return (
    <View>
      <Loader visible={isLoading} className="bg-transparent" />

      <FlatList
        data={data?.data}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => setSelectedUser(item)}>
            <View
              className={cn(
                'flex-row items-center justify-between px-4 py-3 rounded-lg border',
                index === 0
                  ? 'bg-muted border-primary'
                  : item.id === user?.id
                    ? 'bg-muted/50 border-primary/50'
                    : 'bg-popover border-border opacity-90'
              )}
            >
              <Text className="text-lg font-semibold w-10">{index + 1}.</Text>
              <Image source={item.photo} className="size-10 bg-muted max-w-10 max-h-10" />
              <Text className="text-base font-semibold flex-1 ml-3" numberOfLines={1}>
                {item.username}
              </Text>
              <Text className="text-base font-bold">
                {item.totalPoints} {t('Leaderboard.Points')}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        className="mt-4"
        contentContainerStyle={{ gap: 8, paddingBottom: insets.bottom + 50 }}
        ListEmptyComponent={
          <NoData
            imageClassName={imageClassName}
            className="mt-[15%] [&_img]:w-[20px] [&_img]:h-[20px]"
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor={colors['--primary']}
          />
        }
        scrollEnabled={!showCount}
      />

      {/* User Details Modal */}
      <Modal visible={!!selectedUser} onRequestClose={() => setSelectedUser(null)}>
        <View className="bg-muted p-6 rounded-md flex-row gap-4 items-center py-12 relative">
          <TouchableOpacity
            onPress={() => setSelectedUser(null)}
            className="absolute top-4 right-4"
          >
            <X size={20} color={colors['--foreground']} />
          </TouchableOpacity>
          <Image source={selectedUser?.photo} size="lg" defaultSource={FRIENDS.guest} />
          <View>
            <View className="flex-row items-center gap-3">
              <Text className="text-xl font-medium">{selectedUser?.username}</Text>
              <Text className="text-xs text-muted-foreground">·</Text>
              <Text className="text-lg text-muted-foreground">
                {selectedUser?.totalPoints} {t('Leaderboard.Points')}
              </Text>
            </View>
            <Text className="text-sm text-muted-foreground">{selectedUser?.email}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
