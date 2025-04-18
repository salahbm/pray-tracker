'use client';

import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface UserProfileProps {
  user: User;
  profile: any; // Type this based on your profile structure
}

export default function UserProfile({ user, profile }: UserProfileProps) {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSubscribe = async (plan: 'monthly' | 'yearly') => {
    // Implement your subscription logic here
    // This could redirect to a payment page or handle in-app purchases
    console.log('Subscribing to', plan);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <div className="border-b pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="mt-1 text-sm text-gray-900">{user.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Subscription Status
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {profile?.subscriptionStatus || 'Free'}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Subscription Plans</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="border rounded-lg p-4">
            <h4 className="text-lg font-medium">Monthly Pro</h4>
            <p className="text-gray-500">$2.99/month</p>
            <button
              onClick={() => handleSubscribe('monthly')}
              className="mt-4 w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
            >
              Subscribe Monthly
            </button>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="text-lg font-medium">Yearly Pro</h4>
            <p className="text-gray-500">$24.99/year</p>
            <p className="text-sm text-green-600">Save 30%</p>
            <button
              onClick={() => handleSubscribe('yearly')}
              className="mt-4 w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
            >
              Subscribe Yearly
            </button>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t">
        <button
          onClick={() => signOut()}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
