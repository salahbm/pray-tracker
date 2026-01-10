import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import Leaderboard from '@/components/views/awards/leaderboard';
import { useGetGlobalLeaderboard } from '@/hooks/leaderboard';
import { useAuthStore } from '@/store/auth/auth-session';
import { TUser } from '@/types/user';

export default function LeaderboardScreen() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<TUser[]>([]);
  const limit = 20;

  const { data, isLoading, refetch, isFetching } = useGetGlobalLeaderboard(page, limit, {
    enabled: !!user,
  });

  // Accumulate data across pages
  useEffect(() => {
    if (data?.data) {
      if (page === 1) {
        // Reset on first page (refresh)
        setAllData(data.data);
      } else {
        // Append new data for subsequent pages
        setAllData(prev => {
          // Prevent duplicates
          const existingIds = new Set(prev.map(u => u.id));
          const newUsers = data.data.filter(u => !existingIds.has(u.id));
          return [...prev, ...newUsers];
        });
      }
    }
  }, [data, page]);

  const handleLoadMore = useCallback(() => {
    if (!data?.pagination || isFetching) return;

    const { page: currentPage, totalPages } = data.pagination;
    if (currentPage < totalPages) {
      setPage(prev => prev + 1);
    }
  }, [data?.pagination, isFetching]);

  const handleRefresh = useCallback(() => {
    setPage(1);
    setAllData([]);
    refetch();
  }, [refetch]);

  return (
    <SafeAreaView className="main-area">
      <GoBack title={t('leaderboard.title')} />
      <Leaderboard
        data={allData}
        isLoading={isLoading && page === 1}
        refetch={handleRefresh}
        onLoadMore={handleLoadMore}
        hasMore={!!data?.pagination && data.pagination.page < data.pagination.totalPages}
        isFetchingMore={isFetching && page > 1}
      />
    </SafeAreaView>
  );
}
