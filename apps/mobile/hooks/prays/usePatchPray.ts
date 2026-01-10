import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

import QueryKeys from '@/constants/query-keys';
import { IPrays } from '@/types/prays';
import agent from '@/lib/agent';

export type PrayerField = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | 'nafl';

type PatchPrayerData = {
  userId: string;
  date: Date;
  field: PrayerField;
  value: 0 | 1 | 2;
};

export const patchPrayer = async (data: PatchPrayerData): Promise<IPrays> => {
  const response = await agent.patch<IPrays>('/prayers', {
    userId: data.userId,
    date: format(data.date, 'yyyy-MM-dd'),
    field: data.field,
    value: data.value,
  });

  return response;
};

const ensureDefaults = (p: Partial<IPrays>, userId: string, date: Date): IPrays => {
  return {
    id: p.id ?? 'temp-id',
    userId: p.userId ?? userId,
    date: (p.date as any) ?? date,
    fajr: (p.fajr ?? 0) as any,
    dhuhr: (p.dhuhr ?? 0) as any,
    asr: (p.asr ?? 0) as any,
    maghrib: (p.maghrib ?? 0) as any,
    isha: (p.isha ?? 0) as any,
    nafl: (p.nafl ?? 0) as any,
    createdAt: p.createdAt ?? new Date(),
    updatedAt: p.updatedAt ?? new Date(),
  } as IPrays;
};

export const usePatchPray = () => {
  const queryClient = useQueryClient();

  // Guards against stale/out-of-order successes per (userId + date)
  const latestSeqRef = useRef<Record<string, number>>({});

  return useMutation({
    mutationFn: (vars: PatchPrayerData) => patchPrayer(vars),

    onMutate: async vars => {
      const dateStr = format(vars.date, 'yyyy-MM-dd');
      const isToday = dateStr === format(new Date(), 'yyyy-MM-dd');
      const year = vars.date.getFullYear();

      // Include date in today key to match useGetTodayPrays signature
      const todayKey = [
        ...QueryKeys.prays.today,
        { id: vars.userId, date: format(new Date(), 'yyyy-MM-dd') },
      ];
      const praysKey = [...QueryKeys.prays.list, { id: vars.userId, year }];

      // sequence key
      const seqKey = `${vars.userId}:${dateStr}`;
      const seq = (latestSeqRef.current[seqKey] ?? 0) + 1;
      latestSeqRef.current[seqKey] = seq;

      await queryClient.cancelQueries({ queryKey: todayKey });
      await queryClient.cancelQueries({ queryKey: praysKey });

      const previousTodayPrayer = queryClient.getQueryData<IPrays>(todayKey);
      const previousPrayers = queryClient.getQueryData<IPrays[]>(praysKey);

      // Optimistic: update ONLY the field being changed
      if (isToday) {
        queryClient.setQueryData<IPrays>(todayKey, old => {
          const base = ensureDefaults(old ?? {}, vars.userId, vars.date);
          return { ...base, [vars.field]: vars.value, updatedAt: new Date() } as IPrays;
        });
      }

      queryClient.setQueryData<IPrays[]>(praysKey, old => {
        const list = old ?? [];
        const idx = list.findIndex(p => format(new Date(p.date), 'yyyy-MM-dd') === dateStr);

        if (idx === -1) {
          const base = ensureDefaults({}, vars.userId, vars.date);
          return [...list, { ...base, [vars.field]: vars.value, updatedAt: new Date() } as IPrays];
        }

        return list.map((p, i) => {
          if (i !== idx) return p;
          const base = ensureDefaults(p, vars.userId, vars.date);
          return { ...base, [vars.field]: vars.value, updatedAt: new Date() } as IPrays;
        });
      });

      return {
        previousTodayPrayer,
        previousPrayers,
        todayKey,
        praysKey,
        seqKey,
        seq,
        isToday,
        dateStr,
      };
    },

    onSuccess: (serverPrayer, _vars, ctx) => {
      if (!ctx) return;

      // Ignore stale success
      if (latestSeqRef.current[ctx.seqKey] !== ctx.seq) return;

      // Server is source of truth (prevents drift)
      if (ctx.isToday) {
        queryClient.setQueryData<IPrays>(ctx.todayKey, serverPrayer);
      }

      queryClient.setQueryData<IPrays[]>(ctx.praysKey, old => {
        const list = old ?? [];
        const idx = list.findIndex(p => format(new Date(p.date), 'yyyy-MM-dd') === ctx.dateStr);
        if (idx === -1) return [...list, serverPrayer];
        return list.map((p, i) => (i === idx ? serverPrayer : p));
      });

      // If points/leaderboard depends on this update, keep it
      queryClient.invalidateQueries({
        queryKey: QueryKeys.leaderboard.global,
        type: 'all',
        exact: false,
      });
    },

    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      if (ctx.previousTodayPrayer) queryClient.setQueryData(ctx.todayKey, ctx.previousTodayPrayer);
      if (ctx.previousPrayers) queryClient.setQueryData(ctx.praysKey, ctx.previousPrayers);
    },
  });
};
