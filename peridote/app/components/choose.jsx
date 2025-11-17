 "use client";
import React, { useState } from 'react';
import { Plane, Building2, Car, MapPin, Calendar, Search } from 'lucide-react';

export default function Choose() {
  const [activeTab, setActiveTab] = useState('flights');

  const tabs = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Building2 },
    { id: 'cars', label: 'Cars', icon: Car }
  ];

  return (
    <div className="bg-white -mt-0 relative z-10 px-4 md:px-8 pb-8 md:pb-12 flex items-center justify-center ">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 "  style={{ fontFamily: 'var(--font-poppins)',}}>
          {/* Main Card */}
          <div className="w-full lg:flex-1 bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-cyan-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Form Content */}
            <div className="p-4 md:p-6">
              {activeTab === 'flights' && (
                <div className="space-y-4">
                  {/* From and To Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        From
                      </label>
                      <div className="relative text-sm">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          placeholder="Lagos (LOS)"
                          className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-transparent outline-none text-gray-700"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        To
                      </label>
                      <div className="relative text-sm">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          placeholder="London (LHR)"
                          className="w-full pl-11 pr-4 py-2.5  border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-transparent outline-none text-gray-700"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-black">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Departure Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="date"
                          className="w-full text-black pl-11 text-sm pr-4 py-2.5 border border-gray-300  placeholder:text-black rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Return Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="date"
                          className="w-full pl-11 text-black text-sm pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Search Button */}
                  <button className="w-full  text-sm bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <Search size={20} />
                    Search Flights
                  </button>
                </div>
              )}

              {activeTab === 'hotels' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm ">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Destination
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          placeholder="Enter city or hotel name"
                          className="w-full pl-11  text-black pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Guests
                      </label>
                      <input
                        type="number"
                        placeholder="Number of guests"
                        className="w-full px-4 py-2.5 text-black border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-black">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Check-in Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="date"
                          className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Check-out Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="date"
                          className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <button className="w-full  text-sm bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg">
                    <Search size={20} />
                    Search Hotels
                  </button>
                </div>
              )}

              {activeTab === 'cars' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Pick-up Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          placeholder="Enter location"
                          className="w-full text-sm text-black pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Drop-off Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          placeholder="Enter location"
                          className="w-full  text-sm text-black pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Pick-up Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="date"
                          className="w-full text-black  text-sm  pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Drop-off Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="date"
                          className="w-full text-sm text-black pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <button className="w-full  bg-cyan-500 hover:bg-cyan-600  text-sm text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg">
                    <Search size={20} />
                    Search Cars
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}