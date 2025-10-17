import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { DayData } from '@/components/shared/heat-map/heat';
import { praysListKeys } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { IPrays } from '@/types/prays';

type TPraysParams = {
  id: string;
  year: number;
};

export type TransformedPrays = Record<string, DayData>;

const getPraysList = async (params: TPraysParams): Promise<IPrays[]> => {
  if (!params.id || !params.year) return [];
  const { data } = await agent(`/prayers/${params.id}/year?year=${params.year}`, {
    method: 'GET',
  });

  return data;
};

export const useGetPrays = (id: string, year: number) =>
  useQuery({
    queryKey: [praysListKeys, id, year],
    queryFn: () => getPraysList({ id, year }),
    placeholderData: keepPreviousData,
    enabled: !!id,
  });
