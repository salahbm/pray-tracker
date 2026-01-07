import { useQuery } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { Inquiry } from '@/types/inquiries';

const getInquiry = async (id: string): Promise<Inquiry> => {
  const data = await agent.get<Inquiry>(`/inquiries/${id}`);
  return data;
};

export const useGetInquiry = (id?: string) => {
  return useQuery({
    queryKey: [...QueryKeys.inquiries.detail, { id }],
    queryFn: () => getInquiry(id as string),
    enabled: !!id,
  });
};
