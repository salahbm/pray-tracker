import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { IPrays } from '@/types/prays';

type PrayData = {
  id: string;
  date: Date;
  fajr?: number;
  dhuhr?: number;
  asr?: number;
  maghrib?: number;
  isha?: number;
  nafl?: number;
};

const upsertPrayer = async (data: PrayData): Promise<IPrays> => {
  const response = await agent.post<IPrays>('/prayers', {
    userId: data.id,
    date: format(data.date, 'yyyy-MM-dd'),
    fajr: data.fajr,
    dhuhr: data.dhuhr,
    asr: data.asr,
    maghrib: data.maghrib,
    isha: data.isha,
    nafl: data.nafl,
  });
  return response;
};

/**
 * Hook for creating/updating today's prayer with optimistic updates
 * For old prayers, use useUpdateOldPray instead
 */
export const useCreatePray = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertPrayer,
    onMutate: async newPrayer => {
      const dateStr = format(newPrayer.date, 'yyyy-MM-dd');
      const isToday = dateStr === format(new Date(), 'yyyy-MM-dd');
      const year = newPrayer.date.getFullYear();
      const todayKey = [...QueryKeys.prays.today, { id: newPrayer.id }];
      const praysKey = [...QueryKeys.prays.list, { id: newPrayer.id, year }];

      // Cancel outgoing refetches for these specific queries
      await queryClient.cancelQueries({ queryKey: todayKey });
      await queryClient.cancelQueries({ queryKey: praysKey });

      // Snapshot previous values
      const previousTodayPrayer = queryClient.getQueryData<IPrays>(todayKey);
      const previousPrayers = queryClient.getQueryData<IPrays[]>(praysKey);

      // Optimistically update today's prayer
      if (isToday) {
        queryClient.setQueryData<IPrays>(todayKey, old => {
          if (!old) {
            return {
              id: 'temp-id',
              userId: newPrayer.id,
              date: newPrayer.date,
              fajr: newPrayer.fajr ?? null,
              dhuhr: newPrayer.dhuhr ?? null,
              asr: newPrayer.asr ?? null,
              maghrib: newPrayer.maghrib ?? null,
              isha: newPrayer.isha ?? null,
              nafl: newPrayer.nafl ?? null,
              createdAt: new Date(),
              updatedAt: new Date(),
            } as IPrays;
          }
          return {
            ...old,
            fajr: newPrayer.fajr ?? old.fajr,
            dhuhr: newPrayer.dhuhr ?? old.dhuhr,
            asr: newPrayer.asr ?? old.asr,
            maghrib: newPrayer.maghrib ?? old.maghrib,
            isha: newPrayer.isha ?? old.isha,
            nafl: newPrayer.nafl ?? old.nafl,
            updatedAt: new Date(),
          };
        });
      }

      // Optimistically update the prayers list (for heatmap/history)
      queryClient.setQueryData<IPrays[]>(praysKey, old => {
        if (!old) {
          return [
            {
              id: 'temp-id',
              userId: newPrayer.id,
              date: newPrayer.date,
              fajr: newPrayer.fajr ?? null,
              dhuhr: newPrayer.dhuhr ?? null,
              asr: newPrayer.asr ?? null,
              maghrib: newPrayer.maghrib ?? null,
              isha: newPrayer.isha ?? null,
              nafl: newPrayer.nafl ?? null,
              createdAt: new Date(),
              updatedAt: new Date(),
            } as IPrays,
          ];
        }

        // Find existing prayer for this date
        const existingIndex = old.findIndex(
          pray => format(new Date(pray.date), 'yyyy-MM-dd') === dateStr
        );

        if (existingIndex !== -1) {
          // Update existing prayer
          return old.map((pray, index) => {
            if (index !== existingIndex) return pray;
            return {
              ...pray,
              fajr: newPrayer.fajr ?? pray.fajr,
              dhuhr: newPrayer.dhuhr ?? pray.dhuhr,
              asr: newPrayer.asr ?? pray.asr,
              maghrib: newPrayer.maghrib ?? pray.maghrib,
              isha: newPrayer.isha ?? pray.isha,
              nafl: newPrayer.nafl ?? pray.nafl,
              updatedAt: new Date(),
            };
          });
        } else {
          // Add new prayer
          return [
            ...old,
            {
              id: 'temp-id',
              userId: newPrayer.id,
              date: newPrayer.date,
              fajr: newPrayer.fajr ?? null,
              dhuhr: newPrayer.dhuhr ?? null,
              asr: newPrayer.asr ?? null,
              maghrib: newPrayer.maghrib ?? null,
              isha: newPrayer.isha ?? null,
              nafl: newPrayer.nafl ?? null,
              createdAt: new Date(),
              updatedAt: new Date(),
            } as IPrays,
          ];
        }
      });

      return { previousTodayPrayer, previousPrayers, userId: newPrayer.id, year, isToday };
    },
    onSuccess: (data, variables, context) => {
      // Update cache with real data from server
      // const year = variables.date.getFullYear();
      // const dateStr = format(variables.date, 'yyyy-MM-dd');
      // const todayKey = [...QueryKeys.prays.today, { id: variables.id }];
      // const praysKey = [...QueryKeys.prays.list, { id: variables.id, year }];

      // // Update today's prayer with real data
      // if (context?.isToday) {
      //   queryClient.setQueryData<IPrays>(todayKey, data);
      // }

      queryClient.invalidateQueries({
        queryKey: QueryKeys.leaderboard.global,
        type: 'all',
        exact: false,
      });

      // Update prayers list with real data
      // queryClient.setQueryData<IPrays[]>(praysKey, old => {
      //   if (!old) return [data];

      //   const existingIndex = old.findIndex(
      //     pray => format(new Date(pray.date), 'yyyy-MM-dd') === dateStr
      //   );

      //   if (existingIndex !== -1) {
      //     return old.map((pray, index) => (index === existingIndex ? data : pray));
      //   } else {
      //     return [...old, data].sort(
      //       (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      //     );
      //   }
      // });
    },
    onError: (err, newPrayer, context) => {
      // Rollback to previous values on error
      if (context?.previousTodayPrayer) {
        queryClient.setQueryData(
          [...QueryKeys.prays.today, { id: context.userId }],
          context.previousTodayPrayer
        );
      }
      if (context?.previousPrayers && context?.userId && context?.year) {
        queryClient.setQueryData(
          [...QueryKeys.prays.list, { id: context.userId, year: context.year }],
          context.previousPrayers
        );
      }
    },
    // No onSettled - we handle success manually to avoid unnecessary refetch
  });
};
