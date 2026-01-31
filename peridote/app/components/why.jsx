'use client';

import React, { useEffect, useState } from 'react';
import { Shield, Star, Clock, Headphones } from 'lucide-react';

export default function Why() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Your payments are encrypted and protected with industry-standard security',
      descriptionMobile: ['Your payments are encrypted', 'and protected with industry-standard security']
    },
    {
      icon: Star,
      title: 'Best Prices',
      description: 'Compare and book at the most competitive rates in the market',
      descriptionMobile: ['Compare and book at the', 'most competitive rates in the market']
    },
    {
      icon: Clock,
      title: 'Instant Confirmation',
      description: 'Get immediate booking confirmation via email and SMS',
      descriptionMobile: ['Get immediate booking', 'confirmation via email and SMS']
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Our team is always available to assist you with any queries',
      descriptionMobile: ['Our team is always available', 'to assist you with any queries']
    }
  ];

  return (
    <section className="w-full bg-white py-8 md:py-16 px-4 md:px-8 -mt-4 md:-mt-8"  style={{ fontFamily: 'var(--font-poppins)',}}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" >
          <h2 className="text-2xl md:text-2xl font-semibold text-black mb-4">
            Why Choose Peridote?
          </h2>
          <p className="text-gray-600 text-base md:text-sm max-w-2xl mx-auto">
            Experience premium travel services with unmatched convenience and reliability
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`flex flex-col items-center text-center transition-all duration-700 ease-out transform ${
                  animate
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Icon Circle */}
                <div className="mb-6 relative">
                  <div
                    className="w-15 h-15 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #00587D 0%, #009FE3 100%)'
                    }}
                  >
                    <Icon size={30} className="text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-md font-semibold text-black mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed hidden md:block">
                  {feature.description}
                </p>
                
                {/* Description Mobile - Two Lines */}
                <div className="text-gray-600 text-sm leading-relaxed block md:hidden">
                  {feature.descriptionMobile.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}