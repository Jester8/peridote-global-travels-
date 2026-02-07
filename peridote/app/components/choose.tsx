"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plane, Building2, Car, MapPin, Calendar, Search, ArrowRightLeft, Users, ChevronDown, X, Loader, AlertCircle } from 'lucide-react';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label: string;
}

function SimpleDatePicker({ value, onChange, label }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState(value ? new Date(value) : new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleDayClick = (day: number) => {
    const newDate = new Date(month.getFullYear(), month.getMonth(), day);
    const dateString = newDate.toISOString().split('T')[0];
    onChange(dateString);
    setIsOpen(false);
  };

  const daysInMonth = getDaysInMonth(month);
  const firstDay = getFirstDayOfMonth(month);
  const days: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthName = month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="relative">
      <label className="block text-xs font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2.5 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between text-xs text-gray-900 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
      >
        <span className="text-gray-900">{value ? formatDate(value) : 'Select date'}</span>
        <Calendar size={16} className="text-gray-400" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50">
          <div className="bg-white rounded-t-xl md:rounded-lg w-full md:w-96 p-4 md:p-6 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm text-gray-900">{monthName}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X size={20} className="text-gray-900" />
              </button>
            </div>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))}
                className="flex-1 px-2 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded transition-colors text-gray-900"
              >
                ← Prev
              </button>
              <button
                onClick={() => setMonth(new Date())}
                className="flex-1 px-2 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded transition-colors text-gray-900"
              >
                Today
              </button>
              <button
                onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))}
                className="flex-1 px-2 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded transition-colors text-gray-900"
              >
                Next →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-700 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => day && handleDayClick(day)}
                  disabled={!day}
                  className={`aspect-square flex items-center justify-center text-xs rounded font-medium transition-all ${
                    !day
                      ? 'text-gray-300'
                      : value === new Date(month.getFullYear(), month.getMonth(), day).toISOString().split('T')[0]
                      ? 'bg-cyan-500 text-white'
                      : 'hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Choose() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('flights');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  // City to IATA code mapping
  const cityToIATA: Record<string, string> = {
    'lagos': 'LOS',
    'london': 'LHR',
    'new york': 'JFK',
    'paris': 'CDG',
    'dubai': 'DXB',
    'abuja': 'ABV',
    'accra': 'ACC',
    'nairobi': 'NBO',
    'new delhi': 'DEL',
    'mumbai': 'BOM',
  };

  const getCityIATA = (city: string) => {
    const normalized = city.toLowerCase().trim();
    return cityToIATA[normalized] || normalized.substring(0, 3).toUpperCase();
  };

  const handleFlightChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFlightData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const swapCities = () => {
    setFlightData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  const handleMulticityChange = (index: number, field: string, value: string) => {
    const updated = [...flightData.multicity];
    updated[index] = { ...updated[index], [field]: value };
    setFlightData(prev => ({ ...prev, multicity: updated }));
  };

  const addMulticitySegment = () => {
    setFlightData(prev => ({
      ...prev,
      multicity: [...prev.multicity, { from: '', to: '', date: '' }]
    }));
  };

  const removeMulticitySegment = (index: number) => {
    setFlightData(prev => ({
      ...prev,
      multicity: prev.multicity.filter((_, i) => i !== index)
    }));
  };

  const handleHotelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHotelData(prev => ({ ...prev, [name]: value }));
  };

  const handleCarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarData(prev => ({ ...prev, [name]: value }));
  };

  // Search flights using API route
  const handleSearchFlights = async () => {
    setError(null);

    if (!flightData.from || !flightData.to || !flightData.departureDate) {
      setError('Please fill in all required fields (From, To, Date)');
      return;
    }

    setIsSearching(true);
    try {
      const fromCode = getCityIATA(flightData.from);
      const toCode = getCityIATA(flightData.to);

      console.log('Searching flights:', { fromCode, toCode, date: flightData.departureDate });

      const queryString = new URLSearchParams({
        fly_from: fromCode,
        fly_to: toCode,
        date_from: flightData.departureDate,
        adults: flightData.passengers,
      }).toString();

      console.log('API query:', `/api/flights/search?${queryString}`);

      const apiResponse = await fetch(`/api/flights/search?${queryString}`);

      console.log('API response status:', apiResponse.status);

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json().catch(() => ({}));
        console.error('API error response:', errorData);
        throw new Error(errorData.error || 'Unable to search flights');
      }

      const data = await apiResponse.json();
      console.log('API success, flights count:', data.data?.length || 0);

      const flights = data.data || [];

      if (flights.length === 0) {
        setError('No flights found for this route. Try different dates or cities.');
        setIsSearching(false);
        return;
      }

      const searchParams = new URLSearchParams({
        from: fromCode,
        to: toCode,
        fromCity: flightData.from,
        toCity: flightData.to,
        departureDate: flightData.departureDate,
        passengers: flightData.passengers,
        class: flightData.class,
        flights: encodeURIComponent(JSON.stringify(flights)),
      });

      router.push(`/flights/results?${searchParams.toString()}`);
    } catch (error: any) {
      console.error('Search error:', error);
      setError(error.message || 'Failed to search flights. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full" style={{ fontFamily: 'var(--font-poppins)' }}>
      {/* Error Alert */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
          <div>
            <p className="font-semibold text-red-900">Error</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

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
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
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
                        className="w-full pl-8 pr-8 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
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
                  <SimpleDatePicker 
                    value={flightData.departureDate} 
                    onChange={(date) => setFlightData(prev => ({ ...prev, departureDate: date }))}
                    label="Departure Date"
                  />
                  <div></div>
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
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 text-xs"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 appearance-none cursor-pointer text-xs"
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

                <button 
                  onClick={handleSearchFlights}
                  disabled={isSearching}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white font-medium py-2.5 rounded-md transition-all flex items-center justify-center gap-1.5 shadow hover:shadow-md text-xs"
                >
                  {isSearching ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search size={16} />
                      Search Flights
                    </>
                  )}
                </button>
              </div>
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
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
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
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <SimpleDatePicker 
                  value={hotelData.checkInDate} 
                  onChange={(date) => setHotelData(prev => ({ ...prev, checkInDate: date }))}
                  label="Check-in Date"
                />
                <SimpleDatePicker 
                  value={hotelData.checkOutDate} 
                  onChange={(date) => setHotelData(prev => ({ ...prev, checkOutDate: date }))}
                  label="Check-out Date"
                />
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
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
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
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <SimpleDatePicker 
                  value={carData.pickupDate} 
                  onChange={(date) => setCarData(prev => ({ ...prev, pickupDate: date }))}
                  label="Pick-up Date"
                />
                <SimpleDatePicker 
                  value={carData.dropoffDate} 
                  onChange={(date) => setCarData(prev => ({ ...prev, dropoffDate: date }))}
                  label="Drop-off Date"
                />
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
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center justify-center gap-1 px-2 py-3 font-medium transition-all text-xs ${
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

          <div className={`p-4 ${activeTab === 'flights' ? 'max-h-[350px] overflow-y-auto' : ''}`}>
            {activeTab === 'flights' && (
              <div className="space-y-4">
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
                          className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
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
                          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
                        />
                        <button
                          onClick={swapCities}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                          aria-label="Swap cities"
                        >
                          <ArrowRightLeft size={14} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <SimpleDatePicker 
                      value={flightData.departureDate} 
                      onChange={(date) => setFlightData(prev => ({ ...prev, departureDate: date }))}
                      label="Departure Date"
                    />
                  </div>

                  <div className="space-y-3">
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
                          className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 text-xs"
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
                          className="w-full pl-3 pr-8 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 appearance-none cursor-pointer text-xs"
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

                <button 
                  onClick={handleSearchFlights}
                  disabled={isSearching}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white font-medium py-3 rounded-md transition-all flex items-center justify-center gap-2 shadow hover:shadow-md text-xs mt-2"
                >
                  {isSearching ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search size={16} />
                      Search Flights
                    </>
                  )}
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
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
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
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
                      />
                    </div>
                  </div>
                  <SimpleDatePicker 
                    value={hotelData.checkInDate} 
                    onChange={(date) => setHotelData(prev => ({ ...prev, checkInDate: date }))}
                    label="Check-in Date"
                  />
                  <SimpleDatePicker 
                    value={hotelData.checkOutDate} 
                    onChange={(date) => setHotelData(prev => ({ ...prev, checkOutDate: date }))}
                    label="Check-out Date"
                  />
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
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
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
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
                      />
                    </div>
                  </div>
                  <SimpleDatePicker 
                    value={carData.pickupDate} 
                    onChange={(date) => setCarData(prev => ({ ...prev, pickupDate: date }))}
                    label="Pick-up Date"
                  />
                  <SimpleDatePicker 
                    value={carData.dropoffDate} 
                    onChange={(date) => setCarData(prev => ({ ...prev, dropoffDate: date }))}
                    label="Drop-off Date"
                  />
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