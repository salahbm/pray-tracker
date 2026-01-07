import { useQuery } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { Inquiry } from '@/types/inquiries';

const getInquiry = async (id: string, email: string): Promise<Inquiry> => {
  const data = await agent.get<Inquiry>(`/inquiries/${id}`, {
    params: { email },
  });
  return data;
};

export const useGetInquiry = (id?: string, email?: string) => {
  return useQuery({
    queryKey: [...QueryKeys.inquiries.detail, { id, email }],
    queryFn: () => getInquiry(id as string, email as string),
    enabled: !!id && !!email,
  });
};
