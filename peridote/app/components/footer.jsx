'use client';

import React from 'react';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-50" style={{ fontFamily: 'var(--font-poppins)' }}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Section */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="Peridote Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-xl font-regular text-cyan-500">Peridote</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Your trusted partner for seamless travel experiences. Premium flights, hotels, and car rentals.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white hover:shadow-lg transition-shadow">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white hover:shadow-lg transition-shadow">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white hover:shadow-lg transition-shadow">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white hover:shadow-lg transition-shadow">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-black font-regular text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-cyan-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-cyan-500 transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-cyan-500 transition-colors">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-cyan-500 transition-colors">
                  Special Offers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-cyan-500 transition-colors">
                  Travel Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-black font-regular text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-cyan-500 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-cyan-500 transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-cyan-500 transition-colors">
                  Booking Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-cyan-500 transition-colors">
                  Cancellation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-cyan-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-black font-regular text-lg mb-6">Contact Us</h3>
            
            {/* Address */}
            <div className="flex gap-3 mb-4">
              <MapPin size={20} className="text-cyan-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-600 text-sm">
                123 Travel Street, Victoria Island, Lagos, Nigeria
              </p>
            </div>

            {/* Phone */}
            <div className="flex gap-3 mb-4">
              <Phone size={20} className="text-cyan-500 flex-shrink-0 mt-0.5" />
              <a href="tel:+234800PERIDOTE" className="text-gray-600 text-sm hover:text-cyan-500 transition-colors">
                +234 800 PERIDOTE
              </a>
            </div>

            {/* Email */}
            <div className="flex gap-3 mb-6">
              <Mail size={20} className="text-cyan-500 flex-shrink-0 mt-0.5" />
              <a href="mailto:hello@peridote.travel" className="text-gray-600 text-sm hover:text-cyan-500 transition-colors">
                hello@peridote.travel
              </a>
            </div>

            {/* Support Info */}
            <p className="text-gray-600 text-sm mb-4">
              24/7 Customer Support
            </p>

            {/* WhatsApp Button */}
            <a href="https://wa.me/234800" className="inline-block px-4 py-2 bg-green-500 text-white text-sm rounded-full font-regular hover:bg-green-600 transition-colors">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <p className="text-center text-gray-600 text-sm">
          © {currentYear} Peridote Global Travels. All rights reserved.
        </p>
      </div>
    </footer>
  );
}