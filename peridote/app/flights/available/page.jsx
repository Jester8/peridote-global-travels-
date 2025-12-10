'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, X } from 'lucide-react';
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function Available() {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [sortBy, setSortBy] = useState('price');
  const [directOnly, setDirectOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('paystack');

  const flights = [
    {
      id: 1,
      airline: 'Emirates',
      code: 'EK783',
      departure: '02:00 PM',
      departureCity: 'Lagos (LOS)',
      arrival: '06:20 AM +1',
      arrivalCity: 'London (LHR)',
      duration: '10h 20m',
      stops: '1 stop (Dubai)',
      class: 'Economy',
      seats: '15 seats left',
      price: '₦380,000',
      image: 'emirates.png'
    },
    {
      id: 2,
      airline: 'Lufthansa',
      code: 'LH508',
      departure: '02:00 PM',
      departureCity: 'Lagos (LOS)',
      arrival: '06:20 AM +1',
      arrivalCity: 'London (LHR)',
      duration: '10h 20m',
      stops: '1 stop (Dubai)',
      class: 'Economy',
      seats: '20 seats left',
      price: '₦410,000',
      image: 'luf.png'
    },
    {
      id: 3,
      airline: 'Air Peace',
      code: 'P4730',
      departure: '02:00 PM',
      departureCity: 'Lagos (LOS)',
      arrival: '06:20 AM +1',
      arrivalCity: 'London (LHR)',
      duration: '10h 20m',
      stops: '1 stop (Dubai)',
      class: 'Economy',
      seats: '12 seats left',
      price: '₦450,000',
      image: 'air.png'
    },
    {
      id: 4,
      airline: 'Virgin Atlantic',
      code: 'VS412',
      departure: '02:00 PM',
      departureCity: 'Lagos (LOS)',
      arrival: '06:20 AM +1',
      arrivalCity: 'London (LHR)',
      duration: '10h 20m',
      stops: '1 stop (Dubai)',
      class: 'Economy',
      seats: '9 seats left',
      price: '₦495,000',
      image: 'air.png'
    },
    {
      id: 5,
      airline: 'British Airways',
      code: 'BA075',
      departure: '02:00 PM',
      departureCity: 'Lagos (LOS)',
      arrival: '06:20 AM +1',
      arrivalCity: 'London (LHR)',
      duration: '10h 20m',
      stops: '1 stop (Dubai)',
      class: 'Economy',
      seats: '8 seats left',
      price: '₦520,000',
      image: 'brit.png'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === 'price') {
      return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
    } else if (sortBy === 'duration') {
      const aDur = parseInt(a.duration);
      const bDur = parseInt(b.duration);
      return aDur - bDur;
    } else if (sortBy === 'departure') {
      return a.departure.localeCompare(b.departure);
    }
    return 0;
  });

  const filteredFlights = directOnly
    ? sortedFlights.filter(f => !f.stops.includes('stop'))
    : sortedFlights;

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    setShowBookingModal(true);
  };

  const FlightSkeleton = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
          </div>
        </div>

        <div className="md:col-span-2 space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-20 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-24 animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-16 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-20 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-24 animate-pulse" />
            </div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-40 animate-pulse" />
        </div>

        <div className="space-y-3">
          <div className="h-8 bg-gray-200 rounded w-28 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'var(--font-poppins)' }}>
      <Header />
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 bg-gray-50">
        <div className="mb-8">
          <button className="flex items-center gap-2 px-4 py-2 border-1 border-cyan-500 text-cyan-500 rounded-full hover:bg-blue-50 transition mb-4 font-medium text-sm">
            <ArrowLeft size={18} />
            Back to Search
          </button>

          <h1 className="text-4xl font-medium text-black mb-2">Available Flights</h1>
          <p className="text-gray-600">Lagos → London • Select date</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <h3 className="font-medium text-black">Filters</h3>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Sort By</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="sort" value="price" checked={sortBy === 'price'} onChange={(e) => setSortBy(e.target.value)} />
                    <span className="text-sm text-gray-700">Lowest Price</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="sort" value="duration" checked={sortBy === 'duration'} onChange={(e) => setSortBy(e.target.value)} />
                    <span className="text-sm text-gray-700">Shortest Duration</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="sort" value="departure" checked={sortBy === 'departure'} onChange={(e) => setSortBy(e.target.value)} />
                    <span className="text-sm text-gray-700">Earliest Departure</span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Stops</h4>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={directOnly} onChange={(e) => setDirectOnly(e.target.checked)} />
                  <span className="text-sm text-gray-700">Direct flights only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Flights List */}
          <div className="lg:col-span-3 space-y-4">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => <FlightSkeleton key={index} />)
            ) : filteredFlights.length > 0 ? (
              filteredFlights.map(flight => (
                <div key={flight.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">

                    {/* Airline */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white border-1 border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <img
                          src={`/${flight.image}`}
                          alt={flight.airline}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      <div>
                        <h3 className="font-medium text-black text-sm">{flight.airline}</h3>
                        <p className="text-xs text-gray-600 mb-2">{flight.code}</p>
                        <span className="text-xs font-medium text-gray-700 block mb-1">{flight.class}</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{flight.seats}</span>
                      </div>
                    </div>

                    {/* Flight Details */}
                    <div className="md:col-span-2">
                      <div className="grid grid-cols-3 gap-4">

                        <div>
                          <p className="text-lg font-medium text-black">{flight.departure}</p>
                          <p className="text-sm text-gray-600">{flight.departureCity}</p>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock size={16} className="text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">{flight.duration}</span>
                          </div>
                          <p className="text-xs text-gray-500">{flight.stops}</p>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-medium text-black">{flight.arrival}</p>
                          <p className="text-sm text-gray-600">{flight.arrivalCity}</p>
                        </div>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="text-right">
                      <div className="mb-3">
                        <p className="text-2xl font-semibold text-black">{flight.price}</p>
                        <p className="text-xs text-gray-600">per person</p>
                      </div>

                      <button 
                        onClick={() => handleSelectFlight(flight)}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded transition text-sm"
                      >
                        Select Flight
                      </button>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-600 text-lg">No direct flights available for your search.</p>
                <button
                  onClick={() => setDirectOnly(false)}
                  className="mt-4 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition"
                >
                  View All Flights
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='mt-3'>
  <Footer />

      </div>
    
      {/* Booking Modal */}
      {showBookingModal && selectedFlight && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full shadow-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-black">Complete Your Booking</h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Booking Summary */}
              <div className="space-y-3">
                <h3 className="font-semibold text-black text-sm">Booking Summary</h3>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm text-black">{selectedFlight.airline} - {selectedFlight.code}</p>
                    <p className="text-xs text-gray-600">{selectedFlight.departureCity} → {selectedFlight.arrivalCity}</p>
                  </div>
                  <p className="font-semibold text-black">{selectedFlight.price}</p>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-gray-900">Total</p>
                  <p className="text-lg font-bold text-black">{selectedFlight.price}</p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3">
                <h3 className="font-semibold text-black text-sm">Payment Method</h3>
                <div className="space-y-2">
                  {/* Paystack */}
                  <label
                    onClick={() => setSelectedPayment('paystack')}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition ${
                      selectedPayment === 'paystack'
                        ? 'border-cyan-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="paystack"
                      checked={selectedPayment === 'paystack'}
                      onChange={() => setSelectedPayment('paystack')}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-black">Paystack</p>
                      <p className="text-xs text-gray-600">Quick & Secure</p>
                    </div>
                  </label>

                  {/* Flutterwave */}
                  <label
                    onClick={() => setSelectedPayment('flutterwave')}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition ${
                      selectedPayment === 'flutterwave'
                        ? 'border-cyan-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="flutterwave"
                      checked={selectedPayment === 'flutterwave'}
                      onChange={() => setSelectedPayment('flutterwave')}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-black">Flutterwave</p>
                      <p className="text-xs text-gray-600">Quick & Secure</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Security Message */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span>Your payment information is secure and encrypted</span>
              </div>

              {/* Info Text */}
              <p className="text-xs text-gray-600 text-center">
                You will be redirected to {selectedPayment === 'paystack' ? 'Paystack' : 'Flutterwave'} to complete your payment securely.
              </p>

              {/* CTA Button */}
              <button
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg transition text-sm"
              >
                Continue to {selectedPayment === 'paystack' ? 'Paystack' : 'Flutterwave'}
              </button>

              {/* Terms */}
              <p className="text-xs text-gray-600 text-center">
                By completing this booking, you agree to our{' '}
                <span className="text-cyan-500 font-medium cursor-pointer hover:underline">Terms & Conditions</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}