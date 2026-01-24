'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Mail } from 'lucide-react';
import agent from '@/lib/agent';

const DEFAULT_EMAIL = 'salahbm.dev@gmail.com';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Use Better Auth sign-in endpoint
      const response: any = await agent.post('/api/auth/sign-in/email', {
        email,
        password,
      });

      // Store the token in localStorage
      // The agent will send it in the Authorization header
      if (response.token) {
        localStorage.setItem('auth-token', response.token);
      }

      // On success, redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-30" />

      <Card className="relative w-full max-w-md border-0 shadow-2xl backdrop-blur-sm bg-white/95">
        <CardHeader className="space-y-3 pb-6 text-center">
          <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg">
            <Lock className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Admin Login
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Sign in to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                    className="pl-10 h-12"
                    autoFocus
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-200">
                  {error}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg transition-all duration-200"
              disabled={!email || !password || isLoading || email !== DEFAULT_EMAIL}
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Verifying...
                </>
              ) : (
                'Verify & Continue'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
