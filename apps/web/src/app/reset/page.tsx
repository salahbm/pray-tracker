'use client';
import { useSearchParams } from 'next/navigation';
import PlayStoreButton from '@/components/PlayStoreButton';
import AppStoreButton from '@/components/AppStoreButton';
import { useEffect } from 'react';

function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      window.location.href = 'https://www.noorapp.uz';
      return;
    }

    // Attempt to open the app
    const deepLink = `noor://(auth)/reset-pwd?token=${token}`;
    window.location.href = deepLink;
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-primary to-secondary px-6">
      <div className="max-w-sm text-center">
        <div className="mb-6 inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-r-transparent" />

        <h1 className="mb-3 text-2xl font-bold text-gray-800">Open Noor App</h1>

        <p className="mb-6 text-gray-600">
          We tried to open the Noor app to reset your password. If nothing happened, please install
          the app.
        </p>

        <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
          <AppStoreButton dark />

          <PlayStoreButton dark />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
