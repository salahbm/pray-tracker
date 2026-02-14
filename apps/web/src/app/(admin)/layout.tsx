'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, MessageSquare, ClipboardList, LogOut } from 'lucide-react';
import QueryProvider from '@/providers/query-provider';
import { cn } from '@/lib/utils';
import agent from '@/lib/agent';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Inquiries', href: '/inquiries', icon: MessageSquare },
  { name: 'Onboarding', href: '/onboarding', icon: ClipboardList },
];

export default function AdminLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === '/login') {
      setIsAuthenticated(true);
      return;
    }

    // Check authentication via API
    const checkAuth = async () => {
      try {
        // Call the /auth/me endpoint to verify session
        await agent.get('/auth/me');
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
        router.replace('/login');
      }
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      // Call the custom signout endpoint
      await agent.post('/auth/signout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      router.push('/login');
    }
  };

  // Show loading only on initial mount
  if (isAuthenticated === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // For login page, don't show sidebar
  if (pathname === '/login') {
    return <QueryProvider>{children}</QueryProvider>;
  }

  // Don't render protected pages if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <QueryProvider>
      <div className="flex h-screen flex-col bg-gradient-to-br from-gray-50 to-gray-100 md:flex-row">
        {/* Sidebar */}
        <div className="w-full bg-white shadow-xl md:w-64">
          <div className="flex h-16 items-center justify-center border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600 px-4">
            <h1 className="text-xl font-bold text-white">Noor Admin</h1>
          </div>
          <nav className="px-3 py-4 md:mt-6">
            <div className="flex gap-2 md:flex-col md:space-y-1">
              {navigation.map(item => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/dashboard' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
          <div className="mt-auto border-t border-gray-200 bg-white p-4 md:absolute md:bottom-0 md:w-64 lg:block hidden">
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-red-50 hover:text-red-600 md:justify-start"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">{children}</div>
        </div>
      </div>
    </QueryProvider>
  );
}
