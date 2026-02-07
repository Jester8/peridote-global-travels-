"use client";
import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Clock, Users, AlertCircle, Plane } from 'lucide-react';

interface Flight {
  id: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  departureDate: string;
  duration: string;
  stops: number;
  price: number;
  currency: string;
  priceFormatted: string;
  bookingLink: string;
}

function FlightsResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'stops'>('price');

  // Get data from URL
  const fromCity = searchParams.get('fromCity') || 'Unknown';
  const toCity = searchParams.get('toCity') || 'Unknown';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const departureDate = searchParams.get('departureDate') || '';
  const passengers = searchParams.get('passengers') || '1';
  const flightClass = searchParams.get('class') || 'Economy';

  // Parse flights
  const flights = JSON.parse(decodeURIComponent(searchParams.get('flights') || '[]'));

  // Sort flights
  const sortedFlights = [...flights].sort((a: Flight, b: Flight) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'duration':
        const aDuration = parseInt(a.duration);
        const bDuration = parseInt(b.duration);
        return aDuration - bDuration;
      case 'stops':
        return a.stops - b.stops;
      default:
        return 0;
    }
  });

  const handleBooking = (flight: Flight) => {
    if (flight.bookingLink) {
      window.open(flight.bookingLink, '_blank');
    } else {
      alert('Booking link not available');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'var(--font-poppins)' }}>
      {/* Header */}
      <div className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-4 font-medium"
          >
            <ArrowLeft size={20} />
            Back to Search
          </button>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Flight Results
            </h1>
            <div className="flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-cyan-500" />
                <span className="font-medium">{fromCity} ({from}) → {toCity} ({to})</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-cyan-500" />
                <span>{new Date(departureDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} className="text-cyan-500" />
                <span>{passengers} passenger(s) • {flightClass}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Sorting */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Sort By</h3>
              <div className="space-y-3">
                {[
                  { id: 'price', label: 'Lowest Price', icon: '💰' },
                  { id: 'duration', label: 'Shortest Duration', icon: '⏱️' },
                  { id: 'stops', label: 'Fewest Stops', icon: '✈️' },
                ].map(option => (
                  <label key={option.id} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="sort"
                      value={option.id}
                      checked={sortBy === option.id}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 font-medium">
                      {option.icon} {option.label}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-gray-900 text-lg">{flights.length}</span>
                  <br />
                  flights found
                </p>
              </div>
            </div>
          </div>

          {/* Main Content - Flights List */}
          <div className="lg:col-span-3">
            {flights.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center shadow">
                <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg font-medium">No flights found</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedFlights.map((flight: Flight, index: number) => (
                  <div
                    key={`${flight.id}-${index}`}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-all border-l-4 border-cyan-500 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                        {/* Airline & Flight Number */}
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow">
                            <Plane className="text-white" size={28} />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">
                              {flight.airline}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {from} - {to}
                            </p>
                          </div>
                        </div>

                        {/* Flight Times & Duration */}
                        <div className="md:col-span-2">
                          <div className="grid grid-cols-3 gap-4 text-center md:text-left">
                            <div>
                              <p className="text-xs text-gray-600 font-semibold mb-2">
                                DEPARTURE
                              </p>
                              <p className="text-2xl font-bold text-gray-900">
                                {flight.departureTime}
                              </p>
                              <p className="text-xs text-gray-600 mt-1">{from}</p>
                            </div>

                            <div className="flex flex-col items-center justify-center">
                              <p className="text-xs text-gray-600 font-semibold mb-2">
                                DURATION
                              </p>
                              <p className="text-xl font-bold text-gray-900">
                                {flight.duration}
                              </p>
                              <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                                {flight.stops === 0 ? (
                                  <span className="text-green-600 font-medium">✈️ Direct</span>
                                ) : (
                                  <span>{flight.stops} stop{flight.stops > 1 ? 's' : ''}</span>
                                )}
                              </div>
                            </div>

                            <div>
                              <p className="text-xs text-gray-600 font-semibold mb-2">
                                ARRIVAL
                              </p>
                              <p className="text-2xl font-bold text-gray-900">
                                {flight.arrivalTime}
                              </p>
                              <p className="text-xs text-gray-600 mt-1">{to}</p>
                            </div>
                          </div>
                        </div>

                        {/* Price & Book Button */}
                        <div className="text-center md:text-right flex flex-col items-center md:items-end justify-center gap-4">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">From</p>
                            <p className="text-4xl font-bold text-cyan-600">
                              {flight.priceFormatted}
                            </p>
                          </div>
                          <button
                            onClick={() => handleBooking(flight)}
                            className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-all shadow hover:shadow-lg"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FlightsResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading flights...</p>
        </div>
      </div>
    }>
      <FlightsResultsContent />
    </Suspense>
  );
}