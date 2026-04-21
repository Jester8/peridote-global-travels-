'use client';

import { Plane } from 'lucide-react';

export default function LiveFlightTracker() {
  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Plane className="text-cyan-500" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Flight Search
            </h1>
            <p className="text-sm text-gray-600">
              Find and book flights to your destination
            </p>
          </div>
        </div>
      </div>

      <div className="text-center py-16">
        <Plane size={64} className="text-cyan-400 mb-4 mx-auto" />
        <p className="text-gray-700 text-lg font-medium mb-2">
          Use the search form above to find flights
        </p>
        <p className="text-gray-500 text-sm">
          Enter your departure city, destination, and travel dates to see available flights
        </p>
      </div>
    </div>
  );
}