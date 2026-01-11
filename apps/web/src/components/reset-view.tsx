'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function ResetPasswordView() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  console.log('🚀 ~ file: reset-view.tsx:9 ~ token:', token);

  useEffect(() => {
    if (!token) {
      window.location.href = 'https://pray-tracker.vercel.app';
      return;
    }

    // Attempt to open the app
    const deepLink = `noor://(auth)/reset-pwd?token=${token}`;
    window.location.href = deepLink;
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-6">
      <div className="max-w-sm text-center">
        <div className="mb-6 inline-block h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-r-transparent" />

        <h1 className="mb-3 text-2xl font-bold text-gray-800">Open Noor App</h1>

        <p className="mb-6 text-gray-600">
          We tried to open the Noor app to reset your password. If nothing happened, please install
          the app.
        </p>

        <div className="flex flex-col gap-3">
          <a
            href="https://apps.apple.com/app/YOUR_APP_ID"
            className="rounded-lg bg-black px-4 py-3 text-white"
          >
            Download on the App Store
          </a>

          <a
            href="https://play.google.com/store/apps/details?id=YOUR_PACKAGE"
            className="rounded-lg bg-green-600 px-4 py-3 text-white"
          >
            Get it on Google Play
          </a>
        </div>
      </div>
    </div>
  );
}
