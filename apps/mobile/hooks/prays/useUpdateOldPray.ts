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
 * Hook for updating old (non-today) prayer records with optimistic updates
 * Separate from useCreatePray to avoid cache invalidation conflicts
 */
export const useUpdateOldPray = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertPrayer,
    onMutate: async newPrayer => {
      const dateStr = format(newPrayer.date, 'yyyy-MM-dd');
      const year = newPrayer.date.getFullYear();
      const praysKey = [...QueryKeys.prays.list, { id: newPrayer.id, year }];

      // Cancel outgoing refetches for this specific query
      await queryClient.cancelQueries({ queryKey: praysKey });

      // Snapshot previous value
      const previousPrayers = queryClient.getQueryData<IPrays[]>(praysKey);

      // Optimistically update the prayers list
      queryClient.setQueryData<IPrays[]>(praysKey, old => {
        if (!old) {
          // If no data exists, create a new entry
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
          // Update existing prayer - use immutable update pattern
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
          // Add new prayer (sorted by date)
          const newEntry: IPrays = {
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
          };
          return [...old, newEntry].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
        }
      });

      // Return context with previous values for rollback
      return { previousPrayers, userId: newPrayer.id, year };
    },
    onSuccess: (data, variables, context) => {
      // Update the cache with the real data from server
      const year = variables.date.getFullYear();
      const praysKey = [...QueryKeys.prays.list, { id: variables.id, year }];
      const dateStr = format(variables.date, 'yyyy-MM-dd');

      queryClient.setQueryData<IPrays[]>(praysKey, old => {
        if (!old) return [data];

        const existingIndex = old.findIndex(
          pray => format(new Date(pray.date), 'yyyy-MM-dd') === dateStr
        );

        if (existingIndex !== -1) {
          // Replace temp entry with real data
          return old.map((pray, index) => (index === existingIndex ? data : pray));
        } else {
          // Add new entry
          return [...old, data].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
        }
      });
    },
    onError: (err, newPrayer, context) => {
      // Rollback to previous value on error
      if (context?.previousPrayers && context?.userId && context?.year) {
        queryClient.setQueryData(
          [...QueryKeys.prays.list, { id: context.userId, year: context.year }],
          context.previousPrayers
        );
      }
    },
    // No onSettled - we handle success manually to avoid refetch
  });
};
