import { useMutation, useQueryClient } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { InquiryMessage } from '@/types/inquiries';

export type SendInquiryMessagePayload = {
  inquiryId: string;
  message: string;
};

const sendInquiryMessage = async (
  payload: SendInquiryMessagePayload,
): Promise<InquiryMessage> => {
  const data = await agent.post<InquiryMessage>(
    `/inquiries/${payload.inquiryId}/messages`,
    { message: payload.message },
  );
  return data;
};

export const useSendInquiryMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendInquiryMessage,
    onSuccess: (_message, variables) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.inquiries.all });
      queryClient.invalidateQueries({
        queryKey: [...QueryKeys.inquiries.detail, { id: variables.inquiryId }],
      });
    },
  });
};
