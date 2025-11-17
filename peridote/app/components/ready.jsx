'use client';

import React from 'react';

export default function Ready() {
  return (
    <section
      className="w-full py-16 md:py-24 px-4 md:px-8"
      style={{
        background: 'linear-gradient(135deg, #009FE3 0%, #0077B6 100%)',
        fontFamily: 'var(--font-poppins)'
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          Ready to Start Your Journey?
        </h2>

        {/* Description */}
        <p className="text-md md:text-md text-white mb-8 opacity-95">
          Join thousands of satisfied travelers who trust Peridote Global Travels
        </p>

        {/* CTA Button */}
        <button className="px-7 py-3 bg-white text-black font-light rounded-full hover:bg-gray-50 transition-colors shadow-lg hover:shadow-md">
          Get Started Today
        </button>
      </div>
    </section>
  );
}