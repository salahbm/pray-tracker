import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { proKeys } from '@/constants/query-keys';
import { agent } from '@/lib/agent';

const getPro = async (): Promise<{ id: string; isProVisible: boolean }> => {
  const response = await agent('/pro', {
    method: 'GET',
  });

  return response.data;
};

export const useGetPro = () =>
  useQuery({
    queryKey: [proKeys],
    queryFn: getPro,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1, // avoid retry storms
  });
