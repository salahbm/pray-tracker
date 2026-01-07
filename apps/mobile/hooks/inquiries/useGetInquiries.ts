import { useQuery } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { InquiryListItem } from '@/types/inquiries';

const getInquiries = async (): Promise<InquiryListItem[]> => {
  const data = await agent.get<InquiryListItem[]>('/inquiries/me');
  return data;
};

export const useGetInquiries = () => {
  return useQuery({
    queryKey: QueryKeys.inquiries.all,
    queryFn: getInquiries,
  });
};
