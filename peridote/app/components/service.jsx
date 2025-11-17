'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plane, Building2, Car, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Services() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      icon: Plane,
      title: 'Flight Booking',
      description: 'Compare and book flights from major airlines worldwide with real-time availability.',
      image: '/flight.png',
      cta: 'Book Now'
    },
    {
      icon: Building2,
      title: 'Hotel Reservations',
      description: 'Choose from thousands of hotels worldwide, from budget to luxury, with detailed reviews and photos.',
      image: '/hotel.png',
      cta: 'Book Now'
    },
    {
      icon: Car,
      title: 'Car Hire',
      description: 'Rent premium vehicles with or without a driver. Flexible hourly and daily rates available.',
      image: '/car.png',
      cta: 'Book Now'
    }
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section className="w-full bg-gray-50 py-12 md:py-20 px-4 md:px-8" style={{ fontFamily: 'var(--font-poppins)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
            Our Premium Services
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Everything you need for a perfect journey, all in one place
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all" style={{ boxShadow: `0 4px 20px rgba(0, 159, 227, 0.15)` }}>
                {/* Image Skeleton Loader */}
                {isLoading ? (
                  <div className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
                ) : (
                  <div className="w-full h-48 relative overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Icon Skeleton or Icon */}
                  {isLoading ? (
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse mb-4"></div>
                  ) : (
                    <div className="mb-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center inline-flex"
                        style={{
                          background: 'linear-gradient(135deg, #00587D 0%, #009FE3 100%)'
                        }}
                      >
                        <Icon size={24} className="text-white" strokeWidth={1.5} />
                      </div>
                    </div>
                  )}

                  {/* Title Skeleton or Title */}
                  {isLoading ? (
                    <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse mb-3 w-3/4"></div>
                  ) : (
                    <h3 className="text-xl font-semibold text-black mb-3">
                      {service.title}
                    </h3>
                  )}

                  {/* Description Skeleton or Description */}
                  {isLoading ? (
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-full"></div>
                      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-5/6"></div>
                      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-4/5"></div>
                    </div>
                  ) : (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                  )}

                  {/* CTA Button Skeleton or Button */}
                  {isLoading ? (
                    <div className="h-5 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 rounded animate-pulse w-24"></div>
                  ) : (
                    <button className="flex items-center gap-2 text-cyan-500 hover:text-cyan-600 font-semibold transition-colors group">
                      {service.cta}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile and Tablet Slider */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`
              }}
            >
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm" style={{ boxShadow: `0 4px 20px rgba(0, 159, 227, 0.15)` }}>
                      {/* Image Skeleton Loader */}
                      {isLoading ? (
                        <div className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
                      ) : (
                        <div className="w-full h-48 relative overflow-hidden">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover w-full h-full"
                            priority
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6">
                        {/* Icon Skeleton or Icon */}
                        {isLoading ? (
                          <div className="w-12 h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse mb-4"></div>
                        ) : (
                          <div className="mb-4">
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center inline-flex"
                              style={{
                                background: 'linear-gradient(135deg, #00587D 0%, #009FE3 100%)'
                              }}
                            >
                              <Icon size={24} className="text-white" strokeWidth={1.5} />
                            </div>
                          </div>
                        )}

                        {/* Title Skeleton or Title */}
                        {isLoading ? (
                          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse mb-3 w-3/4"></div>
                        ) : (
                          <h3 className="text-xl font-semibold text-black mb-3">
                            {service.title}
                          </h3>
                        )}

                        {/* Description Skeleton or Description */}
                        {isLoading ? (
                          <div className="space-y-2 mb-4">
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-full"></div>
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-5/6"></div>
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-4/5"></div>
                          </div>
                        ) : (
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            {service.description}
                          </p>
                        )}

                        {/* CTA Button Skeleton or Button */}
                        {isLoading ? (
                          <div className="h-5 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 rounded animate-pulse w-24"></div>
                        ) : (
                          <button className="flex items-center gap-2 text-cyan-500 hover:text-cyan-600 font-semibold transition-colors group">
                            {service.cta}
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all"
              style={{ boxShadow: `0 2px 10px rgba(0, 159, 227, 0.1)` }}
            >
              <ChevronLeft size={24} className="text-cyan-500" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-cyan-500 w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all"
              style={{ boxShadow: `0 2px 10px rgba(0, 159, 227, 0.1)` }}
            >
              <ChevronRight size={24} className="text-cyan-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}