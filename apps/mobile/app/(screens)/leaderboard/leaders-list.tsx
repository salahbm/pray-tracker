import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, RefreshControl, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';
import { TUser } from '@/types/user';
import GoBack from '@/components/shared/go-back';
import Leaderboard from '@/components/views/awards/leaderboard';
import { useGetGlobalLeaderboard } from '@/hooks/leaderboard';

export default function LeaderboardScreen() {
  const { t } = useTranslation();
    const { data, isLoading, refetch } = useGetGlobalLeaderboard(1, 50);

  return (
    <SafeAreaView className="main-area">
      <GoBack title={t('Leaderboard.Title')} />
      <Leaderboard data={data?.data!} isLoading={isLoading} refetch={refetch} />
    </SafeAreaView>
  );
}
