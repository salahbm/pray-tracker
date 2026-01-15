import { useMutation, useQueryClient } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { Inquiry } from '@/types/inquiries';

export type CreateInquiryPayload = {
  email: string;
  subject: string;
  message: string;
};

const createInquiry = async (payload: CreateInquiryPayload): Promise<Inquiry> => {
  const data = await agent.post<Inquiry>('/inquiries', payload, {
    suppressUnauthorizedLogout: true,
  });
  return data;
};

export const useCreateInquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInquiry,
    onSuccess: inquiry => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.inquiries.all });
      queryClient.setQueryData(
        [...QueryKeys.inquiries.detail, { id: inquiry.id, email: inquiry.email }],
        inquiry
      );
    },
  });
};
