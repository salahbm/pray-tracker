'use client';

import { useState } from 'react';
import { FiUser, FiMail, FiSave } from 'react-icons/fi';
import { AnimatedContainer } from '@/app/(auth)/_components/animated-container';
import { useUpdateUser } from '@/hooks/user/useUpdateUser';
import { useRouter } from 'next/navigation';
import type { User } from '@/hooks/user/useGetUser';

interface ProfileSectionProps {
  user: User;
}

export function ProfileSection({ user }: ProfileSectionProps) {
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const router = useRouter();
  const updateUser = useUpdateUser(user.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      await updateUser.mutateAsync({
        firstName,
        lastName,
      });

      setMessage({
        type: 'success',
        text: 'Profile updated successfully!',
      });
      router.refresh();
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Error updating profile. Please try again.',
      });
    }
  };

  return (
    <AnimatedContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow rounded-lg overflow-hidden"
    >
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
        <div className="mt-5">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email (Read-only) */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiMail />
                </div>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  disabled
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>

            {/* First Name Input */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiUser />
                </div>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Enter your first name"
                />
              </div>
            </div>

            {/* Last Name Input */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiUser />
                </div>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Message Display */}
            {message && (
              <div
                className={`rounded-md p-4 ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={updateUser.isPending}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateUser.isPending ? (
                  'Saving...'
                ) : (
                  <>
                    <FiSave className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AnimatedContainer>
  );
}
