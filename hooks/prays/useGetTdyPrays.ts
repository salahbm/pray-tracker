import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

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
  const formattedDate = format(new Date(today), 'yyyy-MM-dd');
  const { data } = await agent(
    `/prays/${params.id}/today?today=${formattedDate}`,
    {
      method: 'GET',
    },
  );

  return data;
};

export const useGetTodayPrays = (id: string) =>
  useQuery({
    queryKey: [todaysPrayKey, praysListKeys],
    queryFn: () => getTodayPray({ id }),
    enabled: !!id,
  });
