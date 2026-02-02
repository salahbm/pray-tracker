import { useQuery } from '@tanstack/react-query';
import agent from '@/lib/agent';
import { Inquiry } from '@/types/index';

interface GetInquiriesParams {
  page?: number;
  limit?: number;
  status?: 'OPEN' | 'CLOSED';
}

interface InquiriesResponse {
  data: Inquiry[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const getInquiries = async (params: GetInquiriesParams): Promise<InquiriesResponse> => {
  const data = await agent.get<InquiriesResponse>('/inquiries/admin/all', {
    params: params as Record<string, string | number | boolean | undefined>,
  });
  return data;
};

export const useGetInquiries = (params: GetInquiriesParams) =>
  useQuery({
    queryKey: ['inquiries', 'list', params],
    queryFn: () => getInquiries(params),
  });
