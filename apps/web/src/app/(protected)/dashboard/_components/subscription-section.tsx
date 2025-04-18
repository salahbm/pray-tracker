'use client';
import { FiCheck } from 'react-icons/fi';
import { AnimatedContainer } from '@/app/(auth)/_components/animated-container';
import type { User } from '@/hooks/user/useGetUser';
import Link from 'next/link';

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
  return (
    <AnimatedContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow rounded-md overflow-hidden"
    >
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Subscription Status
        </h3>
        <div className="mt-5">
          <div className="rounded-lg bg-gray-50 p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-gray-900">
                    {user.isPro ? 'Pro Plan' : 'Free Plan'}
                  </h4>
                  {!user.isPro && (
                    <Link href="/subscription">
                      <button className="ml-4 inline-flex items-center px-4 py-1 lg:py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed">
                        Upgrade
                      </button>
                    </Link>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {user.isPro
                    ? `Your subscription is active until ${new Date(
                        user.proUntil!,
                      ).toLocaleDateString()}`
                    : 'Upgrade to Pro to unlock all features'}
                </p>
              </div>
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
