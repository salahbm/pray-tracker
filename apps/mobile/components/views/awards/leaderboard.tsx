import { X } from 'lucide-react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Loader from '@/components/shared/loader';
import Modal from '@/components/shared/modal';
import NoData from '@/components/shared/no-data';
import Image from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { FRIENDS } from '@/constants/images';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';
import { TUser } from '@/types/user';

interface LeaderboardProps {
  data?: TUser[];
  isLoading?: boolean;
  imageClassName?: string;
  refetch?: () => void;
  scrollEnabled?: boolean;
}

export default function Leaderboard({
  data = [],
  isLoading = false,
  imageClassName,
  refetch,
  scrollEnabled = true,
}: LeaderboardProps) {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();
  const { colors } = useThemeStore();

  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const leaderboardData = data ?? [];

  const refreshControl = refetch && (
    <RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor={colors['--primary']} />
  );

  return (
    <View className="flex-1 h-full">
      <Loader visible={isLoading} className="bg-transparent" />

      <FlatList
        data={leaderboardData}
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
              <Image
                source={item.photo}
                className="size-10 bg-muted max-w-10 max-h-10"
                defaultSource={FRIENDS.guest}
              />
              <Text className="text-base font-semibold flex-1 ml-3" numberOfLines={1}>
                {item.username}
              </Text>
              <Text className="text-base font-bold">
                {item.totalPoints} {t('leaderboard.points')}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        className="mt-4"
        contentContainerStyle={{ gap: 8, paddingBottom: insets.bottom + 50 }}
        ListEmptyComponent={
          <NoData
            imageClassName={imageClassName}
            className="mt-[15%] [&_img]:w-[20px] [&_img]:h-[20px]"
          />
        }
        refreshControl={refreshControl ?? undefined}
      />

      {/* User Details Modal */}
      <Modal
        visible={!!selectedUser}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedUser(null)}
      >
        <View className="w-full bg-background rounded-2xl p-6 shadow-lg">
          {/* Close button */}
          <TouchableOpacity
            onPress={() => setSelectedUser(null)}
            className="absolute right-4 top-0 p-2"
          >
            <Text className="text-foreground text-xl">×</Text>
          </TouchableOpacity>

          {/* Avatar */}
          <View className="items-center mb-4 mt-2">
            <Image
              source={selectedUser?.photo}
              size="lg"
              defaultSource={FRIENDS.guest}
              className="rounded-full mb-3"
            />
          </View>

          {/* Username + Points */}
          <View className="items-center mb-3">
            <Text className="text-xl font-semibold">{selectedUser?.username}</Text>

            <View className="flex-row items-center mt-1">
              <Text className="text-sm text-muted-foreground">
                {selectedUser?.totalPoints} {t('leaderboard.points')}
              </Text>
            </View>
          </View>

          {/* Email */}
          <View className="items-center">
            <Text className="text-sm text-muted-foreground">{selectedUser?.email}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
