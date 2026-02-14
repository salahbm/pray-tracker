import { useMutation, useQueryClient } from '@tanstack/react-query';

import agent from '@/lib/agent';
import { Inquiry, InquiryStatus } from '@/types/index';

interface UpdateInquiryStatusParams {
  inquiryId: string;
  status: InquiryStatus;
}

const updateInquiryStatus = async ({
  inquiryId,
  status,
}: UpdateInquiryStatusParams): Promise<Inquiry> => {
  return agent.patch<Inquiry>(`/inquiries/admin/${inquiryId}/status`, { status });
};

export const useUpdateInquiryStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateInquiryStatus,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['inquiries', 'detail', variables.inquiryId] });
      queryClient.invalidateQueries({ queryKey: ['inquiries', 'list'] });
    },
  });
};
