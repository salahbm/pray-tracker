import { useQuery } from '@tanstack/react-query';

import { DayData } from '@/components/shared/heat-map/heat';
import { praysListKeys } from '@/constants/query-keys';
import { agent } from '@/lib/fetch';
import { IPrays } from '@/types/prays';

type TPraysParams = {
  id: string;
  year: number;
};

export type TransformedPrays = Record<string, DayData>;

const getPraysList = async (params: TPraysParams): Promise<IPrays[]> => {
  const { data } = await agent(`/prays/${params.id}/get?year=${params.year}`, {
    method: 'GET',
  });

  return data;
};

export const useGetPrays = (id: string, year: number) =>
  useQuery({
    queryKey: [praysListKeys, id, year],
    queryFn: () => getPraysList({ id, year }),
    enabled: !!id,
  });
