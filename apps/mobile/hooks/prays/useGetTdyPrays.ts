import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { DayData } from '@/components/shared/heat-map/heat';
import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { IPrays } from '@/types/prays';

type TPraysParams = {
  id: string;
  date?: string; // Add date to ensure fresh data after midnight
};

export type TransformedPrays = Record<string, DayData>;

const getTodayPray = async (params: TPraysParams): Promise<IPrays> => {
  if (!params.id) return {} as IPrays;
  // Date param is used in query key to trigger refetch after midnight
  const data = await agent.get<IPrays>(`/prayers/user/${params.id}/today`);
  return data;
};

export const useGetTodayPrays = (id: string, date?: Date) => {
  // Format date to ensure query key changes at midnight
  const dateKey = date ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

  return useQuery({
    queryKey: [...QueryKeys.prays.today, { id, date: dateKey }],
    queryFn: () => getTodayPray({ id, date: dateKey }),
    placeholderData: keepPreviousData,
    enabled: !!id,
  });
};
