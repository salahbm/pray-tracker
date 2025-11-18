import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import Leaderboard from '@/components/views/awards/leaderboard';
import { useGetGlobalLeaderboard } from '@/hooks/leaderboard';

export default function LeaderboardScreen() {
  const { t } = useTranslation();
  const { data, isLoading, refetch } = useGetGlobalLeaderboard(1, 50);

  return (
    <SafeAreaView className="main-area">
      <GoBack title={t('Leaderboard.Title')} />
      <Leaderboard data={data?.data ?? []} isLoading={isLoading} refetch={refetch} />
    </SafeAreaView>
  );
}
