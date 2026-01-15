import { useMutation, useQueryClient } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { InquiryMessage } from '@/types/inquiries';
import { useAuthStore } from '@/store/auth/auth-session';

export type SendInquiryMessagePayload = {
  inquiryId: string;
  email: string;
  message: string;
  userId?: string;
};

const sendInquiryMessage = async ({
  userId,
  ...payload
}: SendInquiryMessagePayload): Promise<InquiryMessage> => {
  const data = await agent.post<InquiryMessage>(
    `/inquiries/${payload.inquiryId}/messages`,
    { message: payload.message, email: payload.email },
    { suppressUnauthorizedLogout: true, headers: { 'x-user-id': userId || '' } }
  );
  return data;
};

export const useSendInquiryMessage = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SendInquiryMessagePayload) =>
      sendInquiryMessage({ ...payload, userId: user?.id }),
    onSuccess: (_message, variables) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.inquiries.all });
      queryClient.invalidateQueries({
        queryKey: [
          ...QueryKeys.inquiries.detail,
          { id: variables.inquiryId, email: variables.email },
        ],
      });
    },
  });
};
