'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Loader() {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    // Just wait for 5 seconds
    const timer = setTimeout(() => {
      setDisplayText('done');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-2">
        {/* Logo */}
        <div className="animate-pulse">
          <Image
            src="/main.png"
            alt="Peridote Logo"
            width={200}
            height={200}
            className="w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 object-contain"
          />
        </div>

        {/* Loading Dots
        <div className="flex gap-3">
          <div
            className="w-3 h-3 rounded-full animate-bounce"
            style={{
              background: 'linear-gradient(135deg, #009FE3 0%, #00587D 100%)',
              animationDelay: '0s',
            }}
          />
          <div
            className="w-3 h-3 rounded-full animate-bounce"
            style={{
              background: 'linear-gradient(135deg, #009FE3 0%, #00587D 100%)',
              animationDelay: '0.15s',
            }}
          />
          <div
            className="w-3 h-3 rounded-full animate-bounce"
            style={{
              background: 'linear-gradient(135deg, #009FE3 0%, #00587D 100%)',
              animationDelay: '0.3s',
            }}
          />
        </div> */}
      </div>
    </div>
  );
}