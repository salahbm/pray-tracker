import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

import { praysListKeys, todaysPrayKey } from '@/constants/query-keys';
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

export const useCreatePray = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertPrayer,
    // Optimistic update: update cache immediately before API call
    onMutate: async newPrayer => {
      const todayKey = [todaysPrayKey, praysListKeys];
      const dateStr = format(newPrayer.date, 'yyyy-MM-dd');
      const isToday = dateStr === format(new Date(), 'yyyy-MM-dd');

      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: todayKey });
      await queryClient.cancelQueries({ queryKey: [praysListKeys] });

      // Snapshot previous values
      const previousTodayPrayer = queryClient.getQueryData(todayKey);
      const previousPrayers = queryClient.getQueryData([praysListKeys]);

      // Optimistically update today's prayer if it's today
      if (isToday) {
        queryClient.setQueryData(todayKey, (old: IPrays | undefined) => {
          if (!old) {
            return {
              id: 'temp-id',
              userId: newPrayer.id,
              date: newPrayer.date.toISOString(),
              fajr: newPrayer.fajr ?? null,
              dhuhr: newPrayer.dhuhr ?? null,
              asr: newPrayer.asr ?? null,
              maghrib: newPrayer.maghrib ?? null,
              isha: newPrayer.isha ?? null,
              nafl: newPrayer.nafl ?? null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
          }
          return {
            ...old,
            fajr: newPrayer.fajr ?? old.fajr,
            dhuhr: newPrayer.dhuhr ?? old.dhuhr,
            asr: newPrayer.asr ?? old.asr,
            maghrib: newPrayer.maghrib ?? old.maghrib,
            isha: newPrayer.isha ?? old.isha,
            nafl: newPrayer.nafl ?? old.nafl,
            updatedAt: new Date().toISOString(),
          };
        });
      }

      // Return context with previous values for rollback
      return { previousTodayPrayer, previousPrayers };
    },
    // On error, rollback to previous values
    onError: (err, newPrayer, context) => {
      if (context?.previousTodayPrayer) {
        queryClient.setQueryData([todaysPrayKey, praysListKeys], context.previousTodayPrayer);
      }
      if (context?.previousPrayers) {
        queryClient.setQueryData([praysListKeys], context.previousPrayers);
      }
    },
    // Always refetch after success or error to ensure data consistency
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [todaysPrayKey],
      });
      await queryClient.invalidateQueries({
        queryKey: [praysListKeys],
      });
    },
  });
};
