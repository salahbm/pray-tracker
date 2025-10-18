import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, RefreshControl, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Loader from '@/components/shared/loader';
import Modal from '@/components/shared/modal';
import NoData from '@/components/shared/no-data';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { TUser } from '@/types/user';

export default function Leaderboard() {
  const { t } = useTranslation();
  // const { data, isLoading, refetch } = useGetUsersList();
  const insets = useSafeAreaInsets();
  const { colors } = useThemeStore();
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

  return (
    <View className="main-area">
      {/* <Loader visible={isLoading} className="bg-transparent" /> */}

      {/* <FlatList
        data={data?.data}
        keyExtractor={user => user.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => setSelectedUser(item)}>
            <View
              className={cn(
                'flex-row items-center justify-between px-4 py-3 rounded-lg border',
                index === 0 ? 'bg-muted border-primary' : 'bg-popover border-border opacity-90'
              )}
            >
              <Text className="text-lg font-semibold">{index + 1}.</Text>
              <Text className="text-lg font-semibold">{item.username}</Text>
              <Text className="text-lg">
                {item.totalPoints} {t('Awards.Leaderboard.Points')}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        className="mt-4"
        contentContainerStyle={{ gap: 8, paddingBottom: insets.bottom + 50 }}
        ListEmptyComponent={<NoData title={t('Commons.NotFound.noData')} className="mt-[45%]" />}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor={colors['--primary']}
          />
        }
      /> */}

      {/* User Details Modal */}
      {/* <Modal isVisible={!!selectedUser} onBackdropPress={() => setSelectedUser(null)}>
        <View className="bg-muted p-6 rounded-md flex-row gap-4 items-center py-8">
          <Image
            source={{ uri: selectedUser?.photo }}
            className="w-16 h-16 rounded-full border border-border max-w-16 max-h-16"
          />
          <View>
            <Text className="text-xl font-bold">{selectedUser?.username}</Text>
            <Text className="text-lg text-muted-foreground">
              {t('Awards.Leaderboard.UserDetails.Points')}: {selectedUser?.totalPoints}
            </Text>
            <Text className="text-sm text-muted-foreground">
              {selectedUser?.firstName} {selectedUser?.lastName}
            </Text>
          </View>
        </View>
      </Modal> */}
    </View>
  );
}
