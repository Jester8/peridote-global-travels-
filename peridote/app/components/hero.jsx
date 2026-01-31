'use client';

import Image from 'next/image';
import Choose from './choose';
import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full h-[560px] sm:h-[900px] md:h-[500px] lg:h-[570px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="Airplane at sunset"
          fill
          priority
          className="object-cover object-center"
          quality={85}
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Hero Heading - Top */}
        <div className="mb-3 sm:mb-4 md:mb-5">
          <h1 
            ref={headingRef}
            className={`text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight max-w-2xl transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Make your travel wishlist, we'll do the rest
          </h1>
          <p 
            ref={subtitleRef}
            className={`text-white/90 text-xs sm:text-sm md:text-base lg:text-lg mt-1.5 sm:mt-2.5 md:mt-3.5 font-normal transition-all duration-1000 ease-out delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Special offers to suit your plan
          </p>
        </div>

      
        <div className="w-full">
          <Choose />
        </div>
      </div>
    </section>
  );
}