import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { awards } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { IResponseArray } from '@/types/api';
import { TAward } from '@/types/awards';

const getAwards = async (userId: string): Promise<IResponseArray<TAward>> => {
  const response = await agent(`/awards/get?id=${userId}`, {
    method: 'GET',
  });

  return response;
};

export const useAwards = (userId: string) =>
  useQuery({
    queryKey: [awards],
    queryFn: () => getAwards(userId),
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });
