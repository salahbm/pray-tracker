'use client';

import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@/hooks/common/useMutation';
import { agent } from '@/lib/agent';

export interface Subscription {
  id: string;
  userId: string;
  isPro: boolean;
  proUntil: string | null;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

const SUBSCRIPTION_QUERY_KEY = 'subscription';

const getSubscription = async (userId: string): Promise<Subscription> => {
  const data = await agent(`/subscriptions/${userId}`);
  return data.data;
};

const createCheckoutSession = async (userId: string, priceId: string): Promise<{ url: string }> => {
  const data = await agent('/create-checkout-session', {
    method: 'POST',
    body: JSON.stringify({ userId, priceId }),
  });
  return data;
};

export const useSubscription = (userId: string) => {
  return useQuery({
    queryKey: [SUBSCRIPTION_QUERY_KEY, userId],
    queryFn: () => getSubscription(userId),
    enabled: !!userId,
  });
};

export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: ({ userId, priceId }: { userId: string; priceId: string }) =>
      createCheckoutSession(userId, priceId),
  });
};
