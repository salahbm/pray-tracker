import { useQuery } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { InquiryListItem } from '@/types/inquiries';

const getInquiries = async (email: string): Promise<InquiryListItem[]> => {
  const data = await agent.get<InquiryListItem[]>('/inquiries', {
    params: { email },
  });
  return data;
};

export const useGetInquiries = (email?: string) => {
  return useQuery({
    queryKey: [...QueryKeys.inquiries.all, { email }],
    queryFn: () => getInquiries(email as string),
    enabled: !!email,
  });
};
