'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Plane, Globe2, MapPin } from 'lucide-react'; 

export default function Hero() {
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSlideIn(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full bg-white overflow-hidden">
    
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Airplane Icon */}
        <Plane
          className="absolute text-[#009FE3]/10 animate-float-slow top-10 left-10 w-16 h-16"
        />
        {/* Globe Icon */}
        <Globe2
          className="absolute text-[#00587D]/10 animate-float-medium bottom-20 right-16 w-20 h-20"
        />
        {/* Map Pin Icon */}
        <MapPin
          className="absolute text-[#FF6B5B]/10 animate-float-fast top-1/3 right-1/4 w-14 h-14"
        />
      </div>

      {/* Main Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-16 py-12 sm:py-16 lg:py-24">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-medium text-black leading-tight mb-6"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Explore the world in style with{' '}
              <span className="relative inline-block">
                <span 
                  className=" font-bold bg-gradient-to-r from-[#009FE3] to-[#00587D] bg-clip-text text-transparent"
                >
                  Peridote
                </span>
                <svg 
                  className="absolute bottom-2 left-0 w-full h-2"
                  viewBox="0 0 200 20"
                  preserveAspectRatio="none"
                >
                  <path 
                    d="M 0 20 Q 20 5, 100 10 T 200 10" 
                    stroke="#FF6B5B" 
                    strokeWidth="20" 
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>

            {/* 👇 Mobile Image (slides in before paragraph) */}
            <div
              className={`block lg:hidden mb-6 transition-all duration-700 ease-in-out transform ${
                slideIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <Image 
                src="/her.png" 
                alt="Travel with Peridote"
                width={500}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            <p 
              className="text-gray-600 text-base sm:text-md lg:text-md leading-relaxed mb-8 max-w-lg"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Your journey to seamless travel starts here. Premium flights, luxury hotels, and reliable car rentals. Book premium flights, luxury hotels, and trusted car rentals effortlessly, and explore the world with confidence.
            </p>
          </div>

          {/* Right Image (Desktop only) */}
          <div className="hidden lg:flex w-full lg:w-1/2 justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <Image 
                src="/her.png" 
                alt="Travel with Peridote" 
                width={500}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* ✨ Floating Animation Keyframes */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-3deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-35px) rotate(4deg); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 5s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
