'use client';

import { useGetUser } from '@/hooks/user/useGetUser';
import { ProfileSection } from './profile-section';
import { SubscriptionSection } from './subscription-section';

interface DashboardContentProps {
  userId: string;
}

export function DashboardContent({ userId }: DashboardContentProps) {
  const { data: userData, isLoading: isUserLoading } = useGetUser(userId);

  const isLoading = isUserLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Not Authorized
          </h2>
          <p className="mt-2 text-gray-600">
            Please sign in to view your dashboard
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {userData.username}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your account settings and view your prayer statistics
              </p>
            </div>
          </div>
          <ProfileSection user={userData} />
          <SubscriptionSection user={userData} />
        </div>
      </div>
    </div>
  );
}
