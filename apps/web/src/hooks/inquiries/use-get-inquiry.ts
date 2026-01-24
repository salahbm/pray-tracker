import { useQuery } from '@tanstack/react-query';
import agent from '@/lib/agent';
import { Inquiry } from '@/types';

const getInquiry = async (inquiryId: string): Promise<Inquiry> => {
  if (!inquiryId) return {} as Inquiry;
  const data = await agent.get<Inquiry>(`/inquiries/admin/${inquiryId}`);
  return data;
};

export const useGetInquiry = (inquiryId: string) =>
  useQuery({
    queryKey: ['inquiries', 'detail', inquiryId],
    queryFn: () => getInquiry(inquiryId),
    enabled: !!inquiryId,
  });
