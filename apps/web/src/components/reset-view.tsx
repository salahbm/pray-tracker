'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function ResetPasswordView() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      // No token, redirect to home
      window.location.href = 'https://prayer-tracker.vercel.app';
      return;
    }

    // Try to open the app with deep link
    const deepLink = `noor://(auth)/reset-pwd?token=${token}`;
    window.location.href = deepLink;

    // Fallback: If app is not installed, redirect to web app after 2 seconds
    const fallbackTimer = setTimeout(() => {
      window.location.href = 'https://prayer-tracker.vercel.app/reset-password';
    }, 2000);

    return () => clearTimeout(fallbackTimer);
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
        <h1 className="mb-2 text-2xl font-bold text-gray-800">Opening Noor App...</h1>
        <p className="text-gray-600">
          If the app doesn't open automatically, you'll be redirected to the web version.
        </p>
      </div>
    </div>
  );
}
