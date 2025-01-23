import { useQuery } from '@tanstack/react-query';

import { DayData } from '@/components/shared/heat-map/heat';
import { praysListKeys, todaysPrayKey } from '@/constants/query-keys';
import { agent } from '@/lib/fetch';
import { IPrays } from '@/types/prays';

type TPraysParams = {
  id: string;
};

export type TransformedPrays = Record<string, DayData>;

const getTodayPray = async (params: TPraysParams): Promise<IPrays> => {
  const today = new Date().toISOString();
  const { data } = await agent(`/prays/${params.id}/today?today=${today}`, {
    method: 'GET',
  });

  return data;
};

export const useGetTodayPrays = (id: string) =>
  useQuery({
    queryKey: [todaysPrayKey, praysListKeys],
    queryFn: () => getTodayPray({ id }),
    enabled: !!id,
  });
