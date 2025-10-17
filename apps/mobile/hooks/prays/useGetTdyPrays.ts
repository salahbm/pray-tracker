import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { DayData } from '@/components/shared/heat-map/heat';
import { praysListKeys, todaysPrayKey } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { IPrays } from '@/types/prays';

type TPraysParams = {
  id: string;
};

export type TransformedPrays = Record<string, DayData>;

const getTodayPray = async (params: TPraysParams): Promise<IPrays> => {
  if (!params.id) return {} as IPrays;
  const { data } = await agent(`/prayers/${params.id}/today`, {
    method: 'GET',
  });

  return data;
};

export const useGetTodayPrays = (id: string) =>
  useQuery({
    queryKey: [todaysPrayKey, praysListKeys],
    queryFn: () => getTodayPray({ id }),
    placeholderData: keepPreviousData,
    enabled: !!id,
  });
