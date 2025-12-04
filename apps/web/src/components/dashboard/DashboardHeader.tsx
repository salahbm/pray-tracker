'use client';

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { BiChevronLeft, BiLogOut, BiMoney } from 'react-icons/bi';

interface DashboardHeaderProps {
  user: any;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button type="button" onClick={() => window.history.back()}>
              <BiChevronLeft className="h-5 w-5 text-gray-400 mr-2 block lg:hidden" />
            </button>
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/images/icon-light-rounded.png"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="font-semibold text-xl text-gray-900">Dashboard</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <Menu as="div" className="ml-3 relative">
              <div>
                <MenuButton className="flex items-center max-w-xs bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {user.user_metadata.username?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                </MenuButton>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">
                      {user.user_metadata.username}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>

                  <MenuItem>
                    {({ focus }) => (
                      <Link
                        href="/subscription"
                        className={`${
                          focus ? 'bg-gray-100' : ''
                        } flex items-center px-4 py-2 text-sm text-gray-700 w-full`}
                      >
                        <BiMoney className="mr-3 h-5 w-5 text-gray-400" />
                        Subscription
                      </Link>
                    )}
                  </MenuItem>
                  {/* <MenuItem>
                    {({ focus }) => (
                      <button
                        className={`${
                          focus ? 'bg-gray-100' : ''
                        } flex items-center px-4 py-2 text-sm text-gray-700 w-full`}
                        onClick={signOut}
                        type="button"
                        disabled={loading}
                      >
                        <BiLogOut className="mr-3 h-5 w-5 text-gray-400" />
                        Sign out
                      </button>
                    )}
                  </MenuItem> */}
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}
