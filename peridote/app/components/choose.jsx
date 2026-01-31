"use client";
import React, { useState } from 'react';
import { Plane, Building2, Car, MapPin, Calendar, Search, ArrowRightLeft, Users, ChevronDown } from 'lucide-react';

export default function Choose() {
  const [activeTab, setActiveTab] = useState('flights');
  const [flightType, setFlightType] = useState('roundtrip');
  const [flightData, setFlightData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: '1',
    class: 'Economy',
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

  const swapCities = () => {
    setFlightData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
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
    <div className="w-full" style={{ fontFamily: 'var(--font-poppins)' }}>
      {/* Desktop Layout */}
      <div className="hidden md:block bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Desktop Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 font-medium transition-all text-xs ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop Form Content */}
        <div className="p-4">
          {activeTab === 'flights' && (
            <div className="space-y-3">
              {/* Flight Type Selector */}
              <div className="flex gap-1.5 flex-wrap">
                {flightTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFlightType(type.id)}
                    className={`px-2.5 py-1.5 rounded-md font-medium text-xs transition-all ${
                      flightType === type.id
                        ? 'bg-cyan-500 text-white shadow'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Round Trip & One Way */}
              {(flightType === 'roundtrip' || flightType === 'oneway') && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        From
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                          type="text"
                          name="from"
                          value={flightData.from}
                          onChange={handleFlightChange}
                          placeholder="Lagos (LOS)"
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 placeholder:text-gray-400 text-xs"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        To
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                          type="text"
                          name="to"
                          value={flightData.to}
                          onChange={handleFlightChange}
                          placeholder="London (LHR)"
                          className="w-full pl-8 pr-8 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 placeholder:text-gray-400 text-xs"
                        />
                        <button
                          onClick={swapCities}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
                          aria-label="Swap cities"
                        >
                          <ArrowRightLeft size={14} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Departure Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                          type="date"
                          name="departureDate"
                          value={flightData.departureDate}
                          onChange={handleFlightChange}
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 text-xs"
                        />
                      </div>
                    </div>
                    {flightType === 'roundtrip' && (
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Return Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                          <input
                            type="date"
                            name="returnDate"
                            value={flightData.returnDate}
                            onChange={handleFlightChange}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Passengers
                      </label>
                      <div className="relative">
                        <Users className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                          type="number"
                          name="passengers"
                          value={flightData.passengers}
                          onChange={handleFlightChange}
                          min="1"
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Class
                      </label>
                      <div className="relative">
                        <select
                          name="class"
                          value={flightData.class}
                          onChange={handleFlightChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 appearance-none cursor-pointer text-xs"
                        >
                          <option>Economy</option>
                          <option>Premium Economy</option>
                          <option>Business</option>
                          <option>First Class</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2.5 rounded-md transition-all flex items-center justify-center gap-1.5 shadow hover:shadow-md text-xs">
                    <Search size={16} />
                    Search Flights
                  </button>
                </div>
              )}

              {/* Multi City */}
              {flightType === 'multicity' && (
                <div className="space-y-3">
                  {flightData.multicity.map((segment, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-md space-y-2 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-800 text-xs">Flight {index + 1}</h4>
                        {flightData.multicity.length > 1 && (
                          <button
                            onClick={() => removeMulticitySegment(index)}
                            className="text-red-500 hover:text-red-700 text-xs font-medium transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            From
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input
                              type="text"
                              value={segment.from}
                              onChange={(e) => handleMulticityChange(index, 'from', e.target.value)}
                              placeholder="Departure city"
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 placeholder:text-gray-400 text-xs"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            To
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input
                              type="text"
                              value={segment.to}
                              onChange={(e) => handleMulticityChange(index, 'to', e.target.value)}
                              placeholder="Arrival city"
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 placeholder:text-gray-400 text-xs"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input
                              type="date"
                              value={segment.date}
                              onChange={(e) => handleMulticityChange(index, 'date', e.target.value)}
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addMulticitySegment}
                    className="w-full border border-cyan-500 text-cyan-500 hover:bg-cyan-50 font-medium py-2 rounded-md transition-all text-xs"
                  >
                    + Add Another Flight
                  </button>

                  <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2.5 rounded-md transition-all flex items-center justify-center gap-1.5 shadow hover:shadow-md text-xs">
                    <Search size={16} />
                    Search Flights
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'hotels' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Destination
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="text"
                      name="destination"
                      value={hotelData.destination}
                      onChange={handleHotelChange}
                      placeholder="Enter city or hotel name"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 placeholder:text-gray-400 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="number"
                      name="guests"
                      value={hotelData.guests}
                      onChange={handleHotelChange}
                      placeholder="Number of guests"
                      min="1"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 placeholder:text-gray-400 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="date"
                      name="checkInDate"
                      value={hotelData.checkInDate}
                      onChange={handleHotelChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Check-out Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="date"
                      name="checkOutDate"
                      value={hotelData.checkOutDate}
                      onChange={handleHotelChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 text-xs"
                    />
                  </div>
                </div>
              </div>

              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2.5 rounded-md transition-all flex items-center justify-center gap-1.5 shadow hover:shadow-md text-xs">
                <Search size={16} />
                Search Hotels
              </button>
            </div>
          )}

          {activeTab === 'cars' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Pick-up Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="text"
                      name="pickupLocation"
                      value={carData.pickupLocation}
                      onChange={handleCarChange}
                      placeholder="Enter location"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 placeholder:text-gray-400 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Drop-off Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="text"
                      name="dropoffLocation"
                      value={carData.dropoffLocation}
                      onChange={handleCarChange}
                      placeholder="Enter location"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 placeholder:text-gray-400 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Pick-up Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="date"
                      name="pickupDate"
                      value={carData.pickupDate}
                      onChange={handleCarChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Drop-off Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="date"
                      name="dropoffDate"
                      value={carData.dropoffDate}
                      onChange={handleCarChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 text-xs"
                    />
                  </div>
                </div>
              </div>

              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2.5 rounded-md transition-all flex items-center justify-center gap-1.5 shadow hover:shadow-md text-xs">
                <Search size={16} />
                Search Cars
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center justify-center gap-1 px-2 py-1 font-medium transition-all text-xs ${
                    activeTab === tab.id
                      ? 'bg-cyan-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Form Content - Scrollable for flights */}
          <div className={`p-4 ${activeTab === 'flights' ? 'max-h-[300px] overflow-y-auto' : ''}`}>
            {activeTab === 'flights' && (
              <div className="space-y-4">
                {/* Flight Type Selector */}
                <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide">
                  {flightTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setFlightType(type.id)}
                      className={`px-2 py-1 rounded-md font-medium text-xs whitespace-nowrap transition-all ${
                        flightType === type.id
                          ? 'bg-cyan-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>

                {(flightType === 'roundtrip' || flightType === 'oneway') && (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          From
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                          <input
                            type="text"
                            name="from"
                            value={flightData.from}
                            onChange={handleFlightChange}
                            placeholder="Lagos (LOS)"
                            className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 placeholder:text-gray-400 text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          To
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                          <input
                            type="text"
                            name="to"
                            value={flightData.to}
                            onChange={handleFlightChange}
                            placeholder="London (LHR)"
                            className="w-full pl-9 pr-9 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 placeholder:text-gray-400 text-xs"
                          />
                          <button
                            onClick={swapCities}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
                            aria-label="Swap cities"
                          >
                            <ArrowRightLeft size={14} className="text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                   <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Departure Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                          <input
                            type="date"
                            name="departureDate"
                            value={flightData.departureDate}
                            onChange={handleFlightChange}
                            className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 text-xs"
                          />
                        </div>
                      </div>
                      {flightType === 'roundtrip' && (
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Return Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input
                              type="date"
                              name="returnDate"
                              value={flightData.returnDate}
                              onChange={handleFlightChange}
                              className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 text-xs"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Passengers
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                          <input
                            type="number"
                            name="passengers"
                            value={flightData.passengers}
                            onChange={handleFlightChange}
                            min="1"
                            className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Class
                        </label>
                        <div className="relative">
                          <select
                            name="class"
                            value={flightData.class}
                            onChange={handleFlightChange}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 appearance-none cursor-pointer text-xs"
                          >
                            <option>Economy</option>
                            <option>Premium Economy</option>
                            <option>Business</option>
                            <option>First Class</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {flightType === 'multicity' && (
                  <div className="space-y-4">
                    {flightData.multicity.map((segment, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded-md space-y-3 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-800 text-xs">Flight {index + 1}</h4>
                          {flightData.multicity.length > 1 && (
                            <button
                              onClick={() => removeMulticitySegment(index)}
                              className="text-red-500 hover:text-red-700 text-xs font-medium transition-colors"
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                              From
                            </label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                              <input
                                type="text"
                                value={segment.from}
                                onChange={(e) => handleMulticityChange(index, 'from', e.target.value)}
                                placeholder="Departure city"
                                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 placeholder:text-gray-400 text-xs"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                              To
                            </label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                              <input
                                type="text"
                                value={segment.to}
                                onChange={(e) => handleMulticityChange(index, 'to', e.target.value)}
                                placeholder="Arrival city"
                                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 placeholder:text-gray-400 text-xs"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                              Date
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                              <input
                                type="date"
                                value={segment.date}
                                onChange={(e) => handleMulticityChange(index, 'date', e.target.value)}
                                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={addMulticitySegment}
                      className="w-full border border-cyan-500 text-cyan-500 hover:bg-cyan-50 font-medium py-2.5 rounded-md transition-all text-xs"
                    >
                      + Add Another Flight
                    </button>
                  </div>
                )}

                <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 rounded-md transition-all flex items-center justify-center gap-2 shadow hover:shadow-md text-xs mt-2">
                  <Search size={16} />
                  Search Flights
                </button>
              </div>
            )}

            {activeTab === 'hotels' && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Destination
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <input
                        type="text"
                        name="destination"
                        value={hotelData.destination}
                        onChange={handleHotelChange}
                        placeholder="Enter city or hotel name"
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 placeholder:text-gray-400 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Guests
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <input
                        type="number"
                        name="guests"
                        value={hotelData.guests}
                        onChange={handleHotelChange}
                        placeholder="Number of guests"
                        min="1"
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 placeholder:text-gray-400 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Check-in Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <input
                        type="date"
                        name="checkInDate"
                        value={hotelData.checkInDate}
                        onChange={handleHotelChange}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Check-out Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <input
                        type="date"
                        name="checkOutDate"
                        value={hotelData.checkOutDate}
                        onChange={handleHotelChange}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 rounded-md transition-all flex items-center justify-center gap-2 shadow hover:shadow-md text-xs mt-2">
                  <Search size={16} />
                  Search Hotels
                </button>
              </div>
            )}

            {activeTab === 'cars' && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Pick-up Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <input
                        type="text"
                        name="pickupLocation"
                        value={carData.pickupLocation}
                        onChange={handleCarChange}
                        placeholder="Enter location"
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 placeholder:text-gray-400 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Drop-off Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <input
                        type="text"
                        name="dropoffLocation"
                        value={carData.dropoffLocation}
                        onChange={handleCarChange}
                        placeholder="Enter location"
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 placeholder:text-gray-400 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Pick-up Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <input
                        type="date"
                        name="pickupDate"
                        value={carData.pickupDate}
                        onChange={handleCarChange}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Drop-off Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <input
                        type="date"
                        name="dropoffDate"
                        value={carData.dropoffDate}
                        onChange={handleCarChange}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-700 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 rounded-md transition-all flex items-center justify-center gap-2 shadow hover:shadow-md text-xs mt-2">
                  <Search size={16} />
                  Search Cars
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}