import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import Leaderboard from '@/components/views/awards/leaderboard';
import { useGetGlobalLeaderboard } from '@/hooks/leaderboard';
import { useAuthStore } from '@/store/auth/auth-session';

export default function LeaderboardScreen() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { data, isLoading, refetch } = useGetGlobalLeaderboard(1, 50, {
    enabled: !!user,
  });

  return (
    <SafeAreaView className="main-area">
      <GoBack title={t('leaderboard.title')} />
      <Leaderboard data={data?.data ?? []} isLoading={isLoading} refetch={refetch} />
    </SafeAreaView>
  );
}
