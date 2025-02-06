import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { awards } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { TAward } from '@/types/awards';

const getAwards = async (userId: string): Promise<TAward[]> => {
  const data = await agent(`/awards/get?id=${userId}`, {
    method: 'GET',
  });

  return data.data;
};

export const useAwards = (userId: string) =>
  useQuery({
    queryKey: [awards],
    queryFn: () => getAwards(userId),
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });
