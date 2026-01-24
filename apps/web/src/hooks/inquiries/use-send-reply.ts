import { useMutation, useQueryClient } from '@tanstack/react-query';
import agent from '@/lib/agent';
import { Inquiry } from '@/types/index';

interface SendReplyParams {
  inquiryId: string;
  message: string;
}

const sendReply = async ({ inquiryId, message }: SendReplyParams): Promise<Inquiry> => {
  const data = await agent.post<Inquiry>(`/inquiries/admin/${inquiryId}/reply`, { message });
  return data;
};

export const useSendReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendReply,
    onSuccess: (_data, variables) => {
      // Invalidate and refetch the inquiry detail
      queryClient.invalidateQueries({ queryKey: ['inquiries', 'detail', variables.inquiryId] });
      // Also invalidate the inquiries list
      queryClient.invalidateQueries({ queryKey: ['inquiries', 'list'] });
    },
  });
};
