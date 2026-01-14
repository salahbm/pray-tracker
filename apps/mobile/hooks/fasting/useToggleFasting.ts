import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { FastingEntry } from '@/types/fasting';
import { useAuthStore } from '@/store/auth/auth-session';

export type ToggleFastingVars = {
  date: Date;
  fasted: boolean;
};

const updateFasting = async (data: ToggleFastingVars): Promise<FastingEntry> => {
  return agent.post<FastingEntry>('/fasting', {
    date: data.date.toISOString(),
    fasted: data.fasted,
  });
};

const toDateKey = (value: string | Date) => format(new Date(value), 'yyyy-MM-dd');

export const useToggleFasting = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore(state => state.user?.id ?? null);

  return useMutation({
    mutationFn: updateFasting,
    onMutate: async vars => {
      const dateKey = format(vars.date, 'yyyy-MM-dd');
      const historyKey = [...QueryKeys.fasting.history, { userId }];

      await queryClient.cancelQueries({ queryKey: historyKey });
      const previousHistory = queryClient.getQueryData<FastingEntry[]>(historyKey);

      queryClient.setQueryData<FastingEntry[]>(historyKey, old => {
        const list = old ?? [];
        const index = list.findIndex(entry => toDateKey(entry.date) === dateKey);
        const now = new Date().toISOString();

        if (index === -1) {
          return [
            {
              id: `temp-${dateKey}`,
              userId: userId ?? '',
              date: vars.date.toISOString(),
              fasted: vars.fasted,
              createdAt: now,
              updatedAt: now,
            },
            ...list,
          ];
        }

        return list.map((entry, idx) =>
          idx === index
            ? {
                ...entry,
                fasted: vars.fasted,
                updatedAt: now,
              }
            : entry
        );
      });

      return { previousHistory, historyKey, dateKey };
    },
    onSuccess: (serverEntry, _vars, ctx) => {
      if (!ctx) return;
      queryClient.setQueryData<FastingEntry[]>(ctx.historyKey, old => {
        const list = old ?? [];
        const index = list.findIndex(entry => toDateKey(entry.date) === ctx.dateKey);
        if (index === -1) return [serverEntry, ...list];
        return list.map((entry, idx) => (idx === index ? serverEntry : entry));
      });
    },
    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      queryClient.setQueryData(ctx.historyKey, ctx.previousHistory);
    },
  });
};
