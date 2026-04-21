"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Clock, Users, AlertCircle, Plane, Loader } from 'lucide-react';

interface Flight {
  id: string;
  airline: string;
  flightNumber?: string;
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
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fromCity = searchParams.get('fromCity') || '';
  const toCity   = searchParams.get('toCity') || '';
  const from     = searchParams.get('from') || '';
  const to       = searchParams.get('to') || '';
  const departureDate = searchParams.get('departureDate') || '';
  const passengers    = searchParams.get('passengers') || '1';
  const flightClass   = searchParams.get('class') || 'Economy';

  // Fetch flights on mount
  useEffect(() => {
    if (!from || !to || !departureDate) {
      setError('Missing search parameters. Please go back and search again.');
      setLoading(false);
      return;
    }

    const fetchFlights = async () => {
      setLoading(true);
      setError(null);
      try {
        const qs = new URLSearchParams({
          fly_from: from,
          fly_to: to,
          date_from: departureDate,
          adults: passengers,
        }).toString();

        const res = await fetch(`/api/flights/search?${qs}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || `Request failed (${res.status})`);
        }

        setFlights(data.data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load flights. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [from, to, departureDate, passengers]);

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'duration') {
      const parse = (d: string) => {
        const h = parseInt(d.match(/(\d+)h/)?.[1] || '0');
        const m = parseInt(d.match(/(\d+)m/)?.[1] || '0');
        return h * 60 + m;
      };
      return parse(a.duration) - parse(b.duration);
    }
    if (sortBy === 'stops') return a.stops - b.stops;
    return 0;
  });

  const formatDisplayDate = (dateStr: string) => {
    try {
      return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric',
      });
    } catch { return dateStr; }
  };

  const handleBooking = (flight: Flight) => {
    if (flight.bookingLink) window.open(flight.bookingLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Manrope, sans-serif' }}>

      {/* Header */}
      <div className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-5">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-3 font-medium text-sm"
          >
            <ArrowLeft size={18} /> Back to Search
          </button>
          <div className="space-y-1.5">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Flight Results</h1>
            <div className="flex flex-wrap gap-3 text-gray-600 text-sm">
              <div className="flex items-center gap-1.5">
                <MapPin size={15} className="text-cyan-500" />
                <span className="font-medium capitalize">{fromCity} ({from}) → {toCity} ({to})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={15} className="text-cyan-500" />
                <span>{formatDisplayDate(departureDate)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={15} className="text-cyan-500" />
                <span>{passengers} passenger(s) · {flightClass}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-16 h-16 bg-cyan-50 rounded-full flex items-center justify-center mb-4">
              <Loader size={28} className="animate-spin text-cyan-500" />
            </div>
            <p className="text-gray-700 font-semibold text-lg">Searching for flights…</p>
            <p className="text-gray-400 text-sm mt-1">{from} → {to} · {departureDate}</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-white rounded-xl p-10 text-center shadow max-w-md mx-auto">
            <AlertCircle size={44} className="mx-auto text-red-400 mb-4" />
            <p className="text-gray-800 font-semibold text-lg">Something went wrong</p>
            <p className="text-gray-500 text-sm mt-2 mb-5">{error}</p>
            <button
              onClick={() => router.back()}
              className="px-5 py-2.5 bg-cyan-500 text-white rounded-lg text-sm font-medium hover:bg-cyan-600 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results */}
        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-5 shadow sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4">Sort By</h3>
                <div className="space-y-1">
                  {[
                    { id: 'price',    label: 'Lowest Price',     icon: '💰' },
                    { id: 'duration', label: 'Shortest Duration', icon: '⏱️' },
                    { id: 'stops',    label: 'Fewest Stops',      icon: '✈️' },
                  ].map(opt => (
                    <label key={opt.id} className="flex items-center gap-3 cursor-pointer p-2.5 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="radio"
                        name="sort"
                        value={opt.id}
                        checked={sortBy === opt.id}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="w-4 h-4 accent-cyan-500 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 font-medium">{opt.icon} {opt.label}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Flights found</p>
                  <p className="text-3xl font-bold text-gray-900 mt-0.5">{flights.length}</p>
                </div>
              </div>
            </div>

            {/* Flight Cards */}
            <div className="lg:col-span-3">
              {flights.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center shadow">
                  <AlertCircle size={44} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-600 font-medium">No flights found</p>
                  <p className="text-gray-400 text-sm mt-1">Try a different date or route</p>
                  <button
                    onClick={() => router.back()}
                    className="mt-5 px-5 py-2.5 bg-cyan-500 text-white rounded-lg text-sm font-medium hover:bg-cyan-600 transition"
                  >
                    Search Again
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {sortedFlights.map((flight, index) => (
                    <div
                      key={`${flight.id}-${index}`}
                      className="bg-white rounded-xl shadow hover:shadow-md transition-all border-l-4 border-cyan-500"
                    >
                      <div className="p-4 md:p-5">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">

                          {/* Airline */}
                          <div className="flex items-center gap-3 md:w-44 flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Plane className="text-white" size={18} />
                            </div>
                            <div>
                              <p className="font-bold text-sm text-gray-900 leading-tight">{flight.airline}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{flight.flightNumber}</p>
                            </div>
                          </div>

                          {/* Times */}
                          <div className="flex-1 grid grid-cols-3 gap-2 text-center">
                            <div>
                              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Departs</p>
                              <p className="text-xl font-bold text-gray-900">{flight.departureTime}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{flight.from}</p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                              <p className="text-xs font-semibold text-gray-900">{flight.duration}</p>
                              <div className="flex items-center gap-1 w-full my-1.5">
                                <div className="h-px flex-1 bg-gray-200" />
                                <Plane size={10} className="text-cyan-400" />
                                <div className="h-px flex-1 bg-gray-200" />
                              </div>
                              {flight.stops === 0
                                ? <span className="text-[10px] text-green-600 font-semibold">Direct</span>
                                : <span className="text-[10px] text-orange-500 font-semibold">{flight.stops} stop{flight.stops > 1 ? 's' : ''}</span>
                              }
                            </div>
                            <div>
                              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Arrives</p>
                              <p className="text-xl font-bold text-gray-900">{flight.arrivalTime}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{flight.to}</p>
                            </div>
                          </div>

                          {/* Price & Book */}
                          <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 md:w-32 flex-shrink-0 pt-3 md:pt-0 border-t md:border-0 border-gray-100">
                            <div className="text-left md:text-right">
                              <p className="text-[10px] text-gray-400">From</p>
                              <p className="text-2xl font-bold text-cyan-600 leading-tight">{flight.priceFormatted}</p>
                              <p className="text-[10px] text-gray-400">per person</p>
                            </div>
                            <button
                              onClick={() => handleBooking(flight)}
                              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-5 rounded-lg transition shadow-sm hover:shadow text-sm whitespace-nowrap"
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
        )}
      </div>
    </div>
  );
}

export default function FlightsResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-500 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading…</p>
        </div>
      </div>
    }>
      <FlightsResultsContent />
    </Suspense>
  );
}