'use client';

import { FiCheck, FiClock } from 'react-icons/fi';
import { AnimatedContainer } from '@/app/(auth)/_components/animated-container';
import { tiers } from '@/data/pricing';

interface SubscriptionSectionProps {
  subscription: any; // Type this based on your subscription structure
}

export function SubscriptionSection({
  subscription,
}: SubscriptionSectionProps) {
  const currentPlan = subscription?.prices?.products?.name || 'Free';
  const isActive = subscription?.status === 'active';

  const handleUpgrade = async (planType: string) => {
    // Implement your subscription upgrade logic here
    console.log('Upgrading to', planType);
  };

  return (
    <AnimatedContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow rounded-lg overflow-hidden"
    >
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Subscription
        </h3>

        <div className="mt-5">
          <div className="flex items-center space-x-2 text-sm">
            <span className="font-medium text-gray-700">Current Plan:</span>
            <span className="text-primary">{currentPlan}</span>
            {isActive && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <FiCheck className="mr-1" />
                Active
              </span>
            )}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {tiers.slice(1).map((tier) => (
              <div
                key={tier.name}
                className="relative flex flex-col p-6 border rounded-lg hover:border-primary transition-colors"
              >
                <h4 className="text-lg font-medium text-gray-900">
                  {tier.name}
                </h4>
                <p className="mt-2 text-sm text-gray-500">{tier.features[0]}</p>

                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900">
                    ${tier.price}
                  </span>
                  <span className="text-gray-500">
                    {tier.name.includes('Yearly') ? '/year' : '/month'}
                  </span>
                </div>

                <ul className="mt-6 space-y-4 flex-1">
                  {tier.features.slice(1).map((feature) => (
                    <li key={feature} className="flex items-start">
                      <FiCheck className="flex-shrink-0 h-5 w-5 text-green-500" />
                      <span className="ml-3 text-sm text-gray-500">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade(tier.name)}
                  disabled={currentPlan === tier.name && isActive}
                  className="mt-8 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentPlan === tier.name && isActive
                    ? 'Current Plan'
                    : `Upgrade to ${tier.name}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
}
