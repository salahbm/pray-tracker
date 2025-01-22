import { Prays } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

import { praysListKeys } from '@/constants/query-keys';
import { agent } from '@/lib/fetch';

type TPraysParams = {
  id: string;
  year: number;
};

const getPraysList = async (params: TPraysParams): Promise<Prays> => {
  const data = await agent(`/pray/${params.id}?year=${params.year}`, {
    method: 'GET',
  });

  return data;
};

export const useGetPrays = (id: string, year: number) =>
  useQuery({
    queryKey: [praysListKeys, id, year],
    queryFn: () => getPraysList({ id, year }),
    enabled: !!id,
    refetchInterval: 20000,
  });
