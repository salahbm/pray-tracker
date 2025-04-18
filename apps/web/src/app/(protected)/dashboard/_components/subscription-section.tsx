'use client';

import { FiCheck } from 'react-icons/fi';
import { AnimatedContainer } from '@/app/(auth)/_components/animated-container';
import { useRouter } from 'next/navigation';
import type { User } from '@/hooks/user/useGetUser';
import { useCreateCheckoutSession } from '@/hooks/subscription/useSubscription';

const features = [
  'Unlimited prayer tracking',
  'Detailed prayer analytics',
  'Prayer reminders',
  'Custom prayer times',
  'Community features',
  'Priority support',
];

interface SubscriptionSectionProps {
  user: User;
}

export function SubscriptionSection({ user }: SubscriptionSectionProps) {
  const createCheckout = useCreateCheckoutSession();

  const handleUpgrade = async () => {
    try {
      const { url } = await createCheckout.mutateAsync({
        userId: user.id,
        priceId: 'price_H5ggYwtDq4fbrJ', // Replace with your actual price ID
      });

      if (url) {
        window.location.href = url;
      }
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <AnimatedContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow rounded-lg overflow-hidden"
    >
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Subscription Status
        </h3>
        <div className="mt-5">
          <div className="rounded-lg bg-gray-50 p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <h4 className="text-lg font-medium text-gray-900">
                  {user.isPro ? 'Pro Plan' : 'Free Plan'}
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  {user.isPro
                    ? `Your subscription is active until ${new Date(
                        user.proUntil!,
                      ).toLocaleDateString()}`
                    : 'Upgrade to Pro to unlock all features'}
                </p>
              </div>
              {!user.isPro && (
                <button
                  onClick={handleUpgrade}
                  disabled={createCheckout.isPending}
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createCheckout.isPending
                    ? 'Processing...'
                    : 'Upgrade to Pro'}
                </button>
              )}
            </div>

            {!user.isPro && (
              <div className="mt-6">
                <h5 className="text-sm font-medium text-gray-900">
                  Pro features include:
                </h5>
                <ul className="mt-4 space-y-4">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <FiCheck className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
}
