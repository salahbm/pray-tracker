import { Metadata } from 'next';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from './login-form';

export const metadata: Metadata = {
  title: 'Sign In - Pray Tracker',
  description: 'Sign in to your Pray Tracker account',
};

export default async function LoginPage() {
  const supabase = createServerComponentClient({ cookies });

  // Check if user is already authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="w-full">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 text-center ">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Please enter your credentials to continue
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
