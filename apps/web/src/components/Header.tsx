'use client';
import { Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { BiLogIn, BiSolidDashboard } from 'react-icons/bi';
import { HiBars3, HiOutlineXMark } from 'react-icons/hi2';

import { menuItems } from '@/data/menuItems';
import { siteDetails } from '@/data/siteDetails';

import Container from './Container';

const Header: React.FC<{ userId?: string }> = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = Boolean(userId && userId.length > 0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-transparent fixed top-0 left-0 right-0 md:absolute z-50 mx-auto w-full">
      <Container className="!px-0">
        <nav className="shadow-md md:shadow-none bg-white md:bg-transparent mx-auto flex justify-between items-center py-2 px-5 md:py-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/icon-light-rounded.png"
              alt="Logo"
              width={40}
              height={40}
              className="w-6 h-6 lg:w-8 lg:h-8"
            />
            <span className="manrope text-md lg:text-xl font-semibold text-foreground cursor-pointer">
              {siteDetails.siteName}
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-4 items-center">
            {menuItems.map(item => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="text-foreground hover:text-foreground-accent transition-colors"
                >
                  {item.text}
                </Link>
              </li>
            ))}
            {/* <li>
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="text-white font-semibold bg-gradient-to-r from-primary to-primary-accent px-4 py-1 lg:py-2 rounded-full transition-colors duration-200 flex items-center gap-2"
                >
                  <BiSolidDashboard className="text-xl" />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="text-white flex items-center gap-1 font-semibold bg-gradient-to-r from-primary to-primary-accent px-4 py-1 lg:py-2 rounded-full transition-colors duration-200"
                >
                  <span>Sign In</span>
                  <BiLogIn className="text-lg" />
                </Link>
              )}
            </li> */}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="text-white text-sm font-semibold bg-gradient-to-r from-primary to-primary-accent px-3 py-1 rounded-full transition-colors duration-200 flex items-center gap-1"
              >
                <BiSolidDashboard className="text-lg" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-white text-sm font-semibold bg-gradient-to-r from-primary to-primary-accent px-3 py-1 rounded-full transition-colors duration-200"
              >
                Sign In
              </Link>
            )} */}
            <button
              onClick={toggleMenu}
              type="button"
              className="text-secondary focus:outline-none w-10 h-10 flex items-center justify-center"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
              ) : (
                <HiBars3 className="h-6 w-6" aria-hidden="true" />
              )}
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu with Transition */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div id="mobile-menu" className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
            {menuItems.map(item => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="text-foreground hover:text-primary block"
                  onClick={toggleMenu}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
