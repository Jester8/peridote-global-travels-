'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <header className="w-full bg-white  sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout with Background */}
        <div className="hidden lg:block bg-gray-100 rounded-full mx-4 sm:mx-6 my-3 sm:my-4 px-6 sm:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Text */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <Image 
                src="/logo.png" 
                alt="Peridote Global Travels" 
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className=" text-black whitespace-nowrap text-sm lg:text-base" style={{ fontFamily: 'var(--font-poppins)' }}>
                <span className="text-[#009FE3]">Peridote</span> <span className="text-black">Global Travels </span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="flex items-center gap-8 xl:gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-black font-light hover:text-[#009FE3] transition-colors text-sm lg:text-base"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="flex items-center gap-3 lg:gap-4">
              <Link 
                href="/sign-in"
                className="px-6 py-2 border-2 border-[#009FE3] text-[#009FE3] rounded-full font-light hover:bg-blue-50 transition-colors text-sm"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Sign In
              </Link>
              <Link 
                href="/sign-up"
                className="px-6 py-2 bg-[#009FE3] text-white rounded-full font-light hover:bg-[#0088c4] transition-colors text-sm"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        
        <div className="lg:hidden flex items-center justify-between h-16 sm:h-20">
          {/* Mobile Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <Image 
              src="/logo.png" 
              alt="Peridote Global Travels" 
              width={40}
              height={40}
              className="h-8 w-auto"
            />
            <span className=" text-black whitespace-nowrap text-sm lg:text-base" style={{ fontFamily: 'var(--font-poppins)' }}>
                <span className="text-[#009FE3]">Peridote</span> <span className="text-black">Global Travels </span>
              </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className="w-6 h-6 text-black" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="space-y-3 pb-4 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block px-4 py-2 text-black font-light hover:text-[#009FE3] rounded transition-colors"
                style={{ fontFamily: 'var(--font-poppins)' }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2 px-4">
              <Link 
                href="/sign-in"
                className="w-full px-6 py-2 border-2 border-[#009FE3] text-[#009FE3] rounded-full font-light hover:bg-blue-50 transition-colors text-center"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Sign In
              </Link>
              <Link 
                href="/sign-up"
                className="w-full px-6 py-2 bg-[#009FE3] text-white rounded-full font-light hover:bg-[#0088c4] transition-colors text-center"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}