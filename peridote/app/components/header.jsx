'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign Up submitted:', formData);
    setFormData({ fullName: '', email: '', password: '' });
    setIsSignUpOpen(false);
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    console.log('Sign In submitted:', signInData);
    setSignInData({ email: '', password: '' });
    setIsSignInOpen(false);
  };

  const switchToSignUp = () => {
    setIsSignInOpen(false);
    setIsSignUpOpen(true);
    setShowPassword(false);
  };

  const switchToSignIn = () => {
    setIsSignUpOpen(false);
    setIsSignInOpen(true);
    setShowPassword(false);
  };

  return (
    <>
      <header className="w-full bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Desktop Header - Reduced height and padding */}
          <div className="hidden lg:block mx-4 sm:mx-6 my-1 sm:my-1.5 px-4 sm:px-6 py-2 sm:py-2.5">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Peridote Global Travels"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <span className="text-black whitespace-nowrap text-sm lg:text-base font-bold" style={{ fontFamily: 'var(--font-manrope)' }}>
                  <span className="text-[#009FE3]">Peridote</span> Global Travels
                </span>
              </Link>

              <nav className="flex items-center gap-6 xl:gap-8">
                {navLinks.map(link => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-black font-medium hover:text-[#009FE3] transition-colors duration-300 text-sm lg:text-base"
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSignInOpen(true)}
                  className="px-4 py-1.5 border border-[#009FE3] text-[#009FE3] rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 text-sm"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsSignUpOpen(true)}
                  className="px-4 py-1.5 bg-[#009FE3] text-white rounded-full font-semibold hover:bg-[#0088c4] transition-all duration-300 text-sm"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Header - Reduced height */}
          <div className="lg:hidden flex items-center justify-between h-14 sm:h-16 px-2 sm:px-4">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/logo.png"
                alt="Peridote Global Travels"
                width={32}
                height={32}
                className="h-8 w-auto sm:h-9"
              />
              <span className="text-black text-xs sm:text-sm font-bold" style={{ fontFamily: 'var(--font-manrope)' }}>
                <span className="text-[#009FE3]">Peridote</span> Global Travels
              </span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg hover:bg-gray-100 active:scale-95 transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden fixed left-0 top-14 sm:top-16 bottom-0 w-full bg-white shadow-xl transition-all duration-500 ease-in-out transform z-30 ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
            <nav className="space-y-1 pt-4 px-4 pb-24">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-2.5 text-black font-medium rounded-lg hover:bg-gray-100 transition-all"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 flex flex-col gap-3 px-4 border-t border-gray-200 mt-4">
                <button
                  onClick={() => { setIsOpen(false); setIsSignInOpen(true); }}
                  className="w-full py-2.5 border-2 border-[#009FE3] text-[#009FE3] rounded-full text-center font-semibold hover:bg-blue-50 transition"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setIsOpen(false); setIsSignUpOpen(true); }}
                  className="w-full py-2.5 bg-[#009FE3] text-white rounded-full font-semibold hover:bg-[#0088c4] transition"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  Sign Up
                </button>
              </div>
            </nav>
          </div>

          {isOpen && (
            <div
              className="lg:hidden fixed inset-0  transition-opacity duration-300 z-20"
              onClick={() => setIsOpen(false)}
            />
          )}

        </div>
      </header>

      {/* Sign In Modal */}
      {isSignInOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity" onClick={() => setIsSignInOpen(false)} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6">
            <div
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ease-out scale-95 sm:scale-100 max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
                <div>
                  <h2 className="text-xl font-bold text-black" style={{ fontFamily: 'var(--font-manrope)' }}>
                    Welcome Back
                  </h2>
                  <p className="text-gray-600 text-sm mt-1" style={{ fontFamily: 'var(--font-manrope)' }}>
                    Sign in to manage your bookings
                  </p>
                </div>
                <button onClick={() => setIsSignInOpen(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200 flex-shrink-0">
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 p-6">
                <form onSubmit={handleSignInSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-black mb-2" style={{ fontFamily: 'var(--font-manrope)' }}>Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        value={signInData.email}
                        onChange={handleSignInChange}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors duration-200 placeholder:text-gray-400 text-sm"
                        style={{ fontFamily: 'var(--font-manrope)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-black mb-2" style={{ fontFamily: 'var(--font-manrope)' }}>Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={signInData.password}
                        onChange={handleSignInChange}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors duration-200 placeholder:text-gray-400 text-sm"
                        style={{ fontFamily: 'var(--font-manrope)' }}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <Link href="#" className="text-cyan-500 hover:text-cyan-600 text-sm font-semibold transition-colors duration-200" style={{ fontFamily: 'var(--font-manrope)' }}>
                      Forgot password?
                    </Link>
                  </div>

                  <button type="submit" className="w-full py-2.5 bg-[#009FE3] text-white font-bold rounded-lg hover:bg-[#0088c4] transition-all duration-300 text-sm" style={{ fontFamily: 'var(--font-manrope)' }}>
                    Sign In
                  </button>
                </form>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-gray-500 text-xs" style={{ fontFamily: 'var(--font-manrope)' }}>Or continue with</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold text-sm" style={{ fontFamily: 'var(--font-manrope)' }}>
                    <Image src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%234285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/%3E%3Cpath fill='%2334A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/%3E%3Cpath fill='%23FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/%3E%3Cpath fill='%23EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/%3E%3C/svg%3E" alt="Google" width={18} height={18} />
                    <span className="hidden sm:inline text-black">Google</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold text-sm" style={{ fontFamily: 'var(--font-manrope)' }}>
                    <Image src="/aapl.png" alt="Apple" width={40} height={40} />
                    <span className="hidden sm:inline text-black">Apple</span>
                  </button>
                </div>

                <p className="text-center text-gray-600 text-xs" style={{ fontFamily: 'var(--font-manrope)' }}>
                  Don't have an account?{' '}
                  <button onClick={switchToSignUp} className="text-cyan-500 font-bold hover:text-cyan-600 transition-colors duration-200">
                    Sign up
                  </button>
                </p>
                <p className="text-center text-gray-500 text-xs leading-relaxed mt-4" style={{ fontFamily: 'var(--font-manrope)' }}>
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Sign Up Modal */}
      {isSignUpOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity" onClick={() => setIsSignUpOpen(false)} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6">
            <div
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ease-out scale-95 sm:scale-100 max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
                <h2 className="text-xl font-bold text-black" style={{ fontFamily: 'var(--font-manrope)' }}>
                  Create Account
                </h2>
                <button onClick={() => setIsSignUpOpen(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200">
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 p-6">
                <p className="text-gray-600 text-sm mb-5" style={{ fontFamily: 'var(--font-manrope)' }}>
                  Join Peridote Global Travels
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-black mb-2" style={{ fontFamily: 'var(--font-manrope)' }}>Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors duration-200 placeholder:text-gray-400 text-sm"
                        style={{ fontFamily: 'var(--font-manrope)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-black mb-2" style={{ fontFamily: 'var(--font-manrope)' }}>Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors duration-200 placeholder:text-gray-400 text-sm"
                        style={{ fontFamily: 'var(--font-manrope)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-black mb-2" style={{ fontFamily: 'var(--font-manrope)' }}>Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors duration-200 placeholder:text-gray-400 text-sm"
                        style={{ fontFamily: 'var(--font-manrope)' }}
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-full py-2.5 bg-[#009FE3] text-white font-bold rounded-lg hover:bg-[#0088c4] transition-all duration-300 mt-4 text-sm" style={{ fontFamily: 'var(--font-manrope)' }}>
                    Create Account
                  </button>
                </form>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-gray-500 text-xs" style={{ fontFamily: 'var(--font-manrope)' }}>Or continue with</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold text-sm" style={{ fontFamily: 'var(--font-manrope)' }}>
                    <Image src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%234285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/%3E%3Cpath fill='%2334A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/%3E%3Cpath fill='%23FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/%3E%3Cpath fill='%23EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/%3E%3C/svg%3E" alt="Google" width={18} height={18} />
                    <span className="hidden sm:inline text-black">Google</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold text-sm" style={{ fontFamily: 'var(--font-manrope)' }}>
                    <Image src="/aapl.png" alt="Apple" width={50} height={50} />
                    <span className="hidden sm:inline text-black">Apple</span>
                  </button>
                </div>

                <p className="text-center text-gray-600 text-xs mb-2" style={{ fontFamily: 'var(--font-manrope)' }}>
                  Already have an account?{' '}
                  <button onClick={switchToSignIn} className="text-cyan-500 font-bold hover:text-cyan-600 transition-colors duration-200">
                    Sign in
                  </button>
                </p>
                <p className="text-center text-gray-500 text-xs leading-relaxed" style={{ fontFamily: 'var(--font-manrope)' }}>
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}