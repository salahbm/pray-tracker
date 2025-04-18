import { Metadata } from 'next';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { ProfileSection } from './_components/profile-section';
import { SubscriptionSection } from './_components/subscription-section';

export const metadata: Metadata = {
  title: 'Dashboard - Pray Tracker',
  description: 'Manage your Pray Tracker account and subscription',
};

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single();

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .eq('user_id', user?.id)
    .single();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {profile?.full_name || user?.email}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your account settings and subscription
              </p>
            </div>
          </div>

          <ProfileSection user={user} profile={profile} />
          <SubscriptionSection subscription={subscription} />
        </div>
      </div>
    </div>
  );
}
