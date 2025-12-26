"use client";
import React, { useState } from 'react';
import { Plane, Building2, Car, MapPin, Calendar, Search } from 'lucide-react';

export default function TravelBooking() {
  const [activeTab, setActiveTab] = useState('flights');
  const [flightType, setFlightType] = useState('roundtrip');
  const [flightData, setFlightData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    multicity: [{ from: '', to: '', date: '' }]
  });
  const [hotelData, setHotelData] = useState({
    destination: '',
    guests: '',
    checkInDate: '',
    checkOutDate: ''
  });
  const [carData, setCarData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: ''
  });

  const tabs = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Building2 },
    { id: 'cars', label: 'Cars', icon: Car }
  ];

  const flightTypes = [
    { id: 'roundtrip', label: 'Round Trip' },
    { id: 'oneway', label: 'One Way' },
    { id: 'multicity', label: 'Multi-City' }
  ];

  const handleFlightChange = (e) => {
    const { name, value } = e.target;
    setFlightData(prev => ({ ...prev, [name]: value }));
  };

  const handleMulticityChange = (index, field, value) => {
    const updated = [...flightData.multicity];
    updated[index][field] = value;
    setFlightData(prev => ({ ...prev, multicity: updated }));
  };

  const addMulticitySegment = () => {
    setFlightData(prev => ({
      ...prev,
      multicity: [...prev.multicity, { from: '', to: '', date: '' }]
    }));
  };

  const removeMulticitySegment = (index) => {
    setFlightData(prev => ({
      ...prev,
      multicity: prev.multicity.filter((_, i) => i !== index)
    }));
  };

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotelData(prev => ({ ...prev, [name]: value }));
  };

  const handleCarChange = (e) => {
    const { name, value } = e.target;
    setCarData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white min-h-screen px-3 md:px-8 py-6 md:py-12" style={{ fontFamily: 'var(--font-poppins)' }}>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-4xl">
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 flex-wrap md:flex-nowrap">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 md:px-6 py-3 md:py-4 font-medium transition-all text-sm md:text-base ${
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
                  {/* Flight Type Selector */}
                  <div className="flex gap-2 flex-wrap">
                    {flightTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setFlightType(type.id)}
                        className={`px-3 md:px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                          flightType === type.id
                            ? 'bg-cyan-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>

                  {/* Round Trip & One Way */}
                  {(flightType === 'roundtrip' || flightType === 'oneway') && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            From
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                              type="text"
                              name="from"
                              value={flightData.from}
                              onChange={handleFlightChange}
                              placeholder="Lagos (LOS)"
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-gray-700 placeholder:text-gray-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            To
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                              type="text"
                              name="to"
                              value={flightData.to}
                              onChange={handleFlightChange}
                              placeholder="London (LHR)"
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-gray-700 placeholder:text-gray-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Departure Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                              type="date"
                              name="departureDate"
                              value={flightData.departureDate}
                              onChange={handleFlightChange}
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-gray-700"
                            />
                          </div>
                        </div>
                        {flightType === 'roundtrip' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Return Date
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                              <input
                                type="date"
                                name="returnDate"
                                value={flightData.returnDate}
                                onChange={handleFlightChange}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-gray-700"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md">
                        <Search size={20} />
                        Search Flights
                      </button>
                    </div>
                  )}

                  {/* Multi City */}
                  {flightType === 'multicity' && (
                    <div className="space-y-4">
                      {flightData.multicity.map((segment, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-700">Segment {index + 1}</h4>
                            {flightData.multicity.length > 1 && (
                              <button
                                onClick={() => removeMulticitySegment(index)}
                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                From
                              </label>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                  type="text"
                                  value={segment.from}
                                  onChange={(e) => handleMulticityChange(index, 'from', e.target.value)}
                                  placeholder="Departure city"
                                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-gray-700 placeholder:text-gray-500"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                To
                              </label>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                  type="text"
                                  value={segment.to}
                                  onChange={(e) => handleMulticityChange(index, 'to', e.target.value)}
                                  placeholder="Arrival city"
                                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-gray-700 placeholder:text-gray-500"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Date
                              </label>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                  type="date"
                                  value={segment.date}
                                  onChange={(e) => handleMulticityChange(index, 'date', e.target.value)}
                                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-gray-700"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={addMulticitySegment}
                        className="w-full border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-50 font-semibold py-2.5 rounded-lg transition-colors"
                      >
                        + Add Another Segment
                      </button>

                      <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md">
                        <Search size={20} />
                        Search Flights
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'hotels' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Destination
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="destination"
                          value={hotelData.destination}
                          onChange={handleHotelChange}
                          placeholder="Enter city or hotel name"
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-gray-700 placeholder:text-gray-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Guests
                      </label>
                      <input
                        type="number"
                        name="guests"
                        value={hotelData.guests}
                        onChange={handleHotelChange}
                        placeholder="Number of guests"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-gray-700 placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Check-in Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="date"
                          name="checkInDate"
                          value={hotelData.checkInDate}
                          onChange={handleHotelChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-gray-700"
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
                          name="checkOutDate"
                          value={hotelData.checkOutDate}
                          onChange={handleHotelChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-gray-700"
                        />
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md">
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
                          name="pickupLocation"
                          value={carData.pickupLocation}
                          onChange={handleCarChange}
                          placeholder="Enter location"
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-gray-700 placeholder:text-gray-500"
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
                          name="dropoffLocation"
                          value={carData.dropoffLocation}
                          onChange={handleCarChange}
                          placeholder="Enter location"
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-gray-700 placeholder:text-gray-500"
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
                          name="pickupDate"
                          value={carData.pickupDate}
                          onChange={handleCarChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-gray-700"
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
                          name="dropoffDate"
                          value={carData.dropoffDate}
                          onChange={handleCarChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-gray-700"
                        />
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md">
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