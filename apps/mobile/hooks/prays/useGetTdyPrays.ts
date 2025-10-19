import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { DayData } from '@/components/shared/heat-map/heat';
import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { IPrays } from '@/types/prays';

type TPraysParams = {
  id: string;
};

export type TransformedPrays = Record<string, DayData>;

const getTodayPray = async (params: TPraysParams): Promise<IPrays> => {
  if (!params.id) return {} as IPrays;
  const data = await agent.get<IPrays>(`/prayers/user/${params.id}/today`);
  return data;
};

export const useGetTodayPrays = (id: string) =>
  useQuery({
    queryKey: [...QueryKeys.prays.today, { id }],
    queryFn: () => getTodayPray({ id }),
    placeholderData: keepPreviousData,
    enabled: !!id,
  });
