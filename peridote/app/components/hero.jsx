'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Plane, Building2, Car, MapPin, Calendar, Search, ArrowRightLeft, Users, ChevronDown, X, Loader, AlertCircle, CheckCircle, WifiOff } from 'lucide-react';

// ─── Toast Notification Component ───────────────────────────────────────────
function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-sm transition-all duration-300 animate-slide-in
            ${toast.type === 'error'
              ? 'bg-red-50/95 border-red-200 text-red-900'
              : toast.type === 'success'
              ? 'bg-green-50/95 border-green-200 text-green-900'
              : 'bg-white/95 border-gray-200 text-gray-900'
            }`}
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          <div className="flex-shrink-0 mt-0.5">
            {toast.type === 'error' && <AlertCircle size={18} className="text-red-500" />}
            {toast.type === 'success' && <CheckCircle size={18} className="text-green-500" />}
            {toast.type === 'info' && <WifiOff size={18} className="text-gray-400" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm leading-snug">{toast.title}</p>
            {toast.message && (
              <p className="text-xs mt-0.5 opacity-80 leading-snug">{toast.message}</p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 p-0.5 rounded hover:bg-black/10 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── useToast hook ───────────────────────────────────────────────────────────
function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = 'error', title, message, duration = 5000 }) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, title, message }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}

function SimpleDatePicker({ value, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState(value ? new Date(value) : new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDayClick = (day) => {
    const newDate = new Date(month.getFullYear(), month.getMonth(), day);
    const dateString = newDate.toISOString().split('T')[0];
    onChange(dateString);
    setIsOpen(false);
  };

  const daysInMonth = getDaysInMonth(month);
  const firstDay = getFirstDayOfMonth(month);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthName = month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="relative">
      <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>
        {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2.5 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between text-xs text-gray-900 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        <span className="text-gray-900">{value ? formatDate(value) : 'Select date'}</span>
        <Calendar size={16} className="text-gray-400" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50">
          <div className="bg-white rounded-t-xl md:rounded-lg w-full md:w-96 p-4 md:p-6 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>{monthName}</h3>
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
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                ← Prev
              </button>
              <button
                onClick={() => setMonth(new Date())}
                className="flex-1 px-2 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded transition-colors text-gray-900"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Today
              </button>
              <button
                onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))}
                className="flex-1 px-2 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded transition-colors text-gray-900"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Next →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-700 py-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
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
                  style={{ fontFamily: 'Manrope, sans-serif' }}
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

export default function Hero() {
  const router = useRouter();
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('flights');
  const [isSearching, setIsSearching] = useState(false);
  const { toasts, addToast, removeToast } = useToast();
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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const tabs = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Building2 },
    { id: 'cars', label: 'Cars', icon: Car }
  ];

  // ─── Expanded IATA map including all major Nigerian airports ───
  const cityToIATA = {
    // Nigeria – domestic
    'lagos': 'LOS',
    'abuja': 'ABV',
    'kano': 'KAN',
    'port harcourt': 'PHC',
    'enugu': 'ENU',
    'calabar': 'CBQ',
    'owerri': 'QOW',
    'benin': 'BNI',
    'benin city': 'BNI',
    'kaduna': 'KAD',
    'ilorin': 'ILR',
    'sokoto': 'SKO',
    'yola': 'YOL',
    'maiduguri': 'MIU',
    'warri': 'QRW',
    'asaba': 'ABB',
    'akure': 'AKR',
    'bauchi': 'BCU',
    'gombe': 'GMO',
    'jos': 'JOS',
    'kebbi': 'KBB',
    'minna': 'MXJ',
    'osubi': 'QRW',
    'uyo': 'QUO',
    'zaria': 'ZAR',
    // International
    'london': 'LHR',
    'london heathrow': 'LHR',
    'london gatwick': 'LGW',
    'new york': 'JFK',
    'paris': 'CDG',
    'dubai': 'DXB',
    'accra': 'ACC',
    'nairobi': 'NBO',
    'johannesburg': 'JNB',
    'cairo': 'CAI',
    'addis ababa': 'ADD',
    'amsterdam': 'AMS',
    'frankfurt': 'FRA',
    'istanbul': 'IST',
    'doha': 'DOH',
    'new delhi': 'DEL',
    'mumbai': 'BOM',
    'houston': 'IAH',
    'atlanta': 'ATL',
    'toronto': 'YYZ',
  };

  const getCityIATA = (city) => {
    const normalized = city.toLowerCase().trim();
    // Direct match
    if (cityToIATA[normalized]) return cityToIATA[normalized];
    // If already looks like an IATA code (2–3 uppercase letters), return as-is
    if (/^[A-Z]{2,3}$/.test(city.trim())) return city.trim().toUpperCase();
    // Partial match – check if any key starts with the input
    const partial = Object.keys(cityToIATA).find(k => k.startsWith(normalized));
    if (partial) return cityToIATA[partial];
    // Fallback: first 3 letters uppercased
    return normalized.substring(0, 3).toUpperCase();
  };

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

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotelData(prev => ({ ...prev, [name]: value }));
  };

  const handleCarChange = (e) => {
    const { name, value } = e.target;
    setCarData(prev => ({ ...prev, [name]: value }));
  };

  // ─── Search flights via /api/flights/search ───
  const handleSearchFlights = async () => {
    if (!flightData.from || !flightData.to || !flightData.departureDate) {
      addToast({
        type: 'error',
        title: 'Missing fields',
        message: 'Please fill in From, To, and a Departure Date.',
      });
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

      // Try to parse a JSON error body regardless of status
      let data;
      const contentType = apiResponse.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        data = await apiResponse.json();
      } else {
        const text = await apiResponse.text();
        console.error('Non-JSON response body:', text);
        throw new Error(`Server returned ${apiResponse.status}: ${text.slice(0, 120)}`);
      }

      if (!apiResponse.ok) {
        console.error('API error response:', data);
        // Bubble up the most specific message available
        const msg =
          data?.details ||        // IGNav raw error
          data?.error ||          // our route's error field
          data?.message ||
          `Request failed with status ${apiResponse.status}`;
        throw new Error(msg);
      }

      console.log('API success, flights count:', data.data?.length || 0);
      const flights = data.data || [];

      if (flights.length === 0) {
        addToast({
          type: 'info',
          title: 'No flights found',
          message: `No results for ${fromCode} → ${toCode} on ${flightData.departureDate}. Try different dates or cities.`,
          duration: 7000,
        });
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
      });

      // Don't pass flights in URL (causes HTTP 431 - headers too large)
      // Results page fetches flights itself using these search params
      router.push(`/flights/results?${searchParams.toString()}`);
    } catch (err) {
      console.error('Search error:', err);
      addToast({
        type: 'error',
        title: 'Flight search failed',
        message: err.message || 'Something went wrong. Please try again.',
        duration: 8000,
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="relative w-full h-[560px] sm:h-[900px] md:h-[500px] lg:h-[570px] overflow-hidden">
      {/* Toast Notifications */}
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Slide-in animation */}
      <style>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(100%); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in { animation: slide-in 0.25s ease-out forwards; }
      `}</style>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="Airplane at sunset"
          fill
          priority
          className="object-cover object-center"
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Hero Heading */}
        <div className="mb-3 sm:mb-4 md:mb-5 md:mt-0 mt-2">
          <h1
            ref={headingRef}
            className={`text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight max-w-2xl transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Make your travel wishlist, we'll do the rest
          </h1>
          <p
            ref={subtitleRef}
            className={`text-white/90 text-xs sm:text-sm md:text-base lg:text-lg mt-1.5 sm:mt-2.5 md:mt-3.5 font-normal transition-all duration-1000 ease-out delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Special offers to suit your plan
          </p>
          <p className="text-white/70 text-[10px] sm:text-xs mt-2 max-w-2xl hidden sm:block" style={{ fontFamily: 'Manrope, sans-serif' }}>
            ✈️ Over 1,000,000 happy travelers | Best price guarantee | 24/7 customer support
          </p>
        </div>

        {/* Search Component */}
        <div className="w-full md:mt-0 -mt-2 sm:mt-0">
          <div className="w-full" style={{ fontFamily: 'Manrope, sans-serif' }}>

            {/* ── DESKTOP LAYOUT ── */}
            <div className="hidden md:block bg-white rounded-lg shadow-xl overflow-hidden">
              {/* Tabs */}
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
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <Icon size={16} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Form Content */}
              <div className="p-4">

                {/* FLIGHTS */}
                {activeTab === 'flights' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>From</label>
                        <div className="relative">
                          <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                          <input
                            type="text"
                            name="from"
                            value={flightData.from}
                            onChange={handleFlightChange}
                            placeholder="Lagos (LOS)"
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <label className="block text-xs font-medium text-gray-700 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>To</label>
                        <div className="relative">
                          <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                          <input
                            type="text"
                            name="to"
                            value={flightData.to}
                            onChange={handleFlightChange}
                            placeholder="Abuja (ABV)"
                            className="w-full pl-8 pr-8 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
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
                      <div />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Passengers</label>
                        <div className="relative">
                          <Users className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                          <input
                            type="number"
                            name="passengers"
                            value={flightData.passengers}
                            onChange={handleFlightChange}
                            min="1"
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 text-xs"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Class</label>
                        <div className="relative">
                          <select
                            name="class"
                            value={flightData.class}
                            onChange={handleFlightChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 appearance-none cursor-pointer text-xs"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
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
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {isSearching ? (
                        <><Loader size={16} className="animate-spin" />Searching...</>
                      ) : (
                        <><Search size={16} />Search Flights</>
                      )}
                    </button>
                  </div>
                )}

                {/* HOTELS */}
                {activeTab === 'hotels' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Destination</label>
                        <div className="relative">
                          <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                          <input
                            type="text"
                            name="destination"
                            value={hotelData.destination}
                            onChange={handleHotelChange}
                            placeholder="Enter city or hotel name"
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Guests</label>
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
                            style={{ fontFamily: 'Manrope, sans-serif' }}
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
                    <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2.5 rounded-md transition-all flex items-center justify-center gap-1.5 shadow hover:shadow-md text-xs" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      <Search size={16} />Search Hotels
                    </button>
                  </div>
                )}

                {/* CARS */}
                {activeTab === 'cars' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Pick-up Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                          <input
                            type="text"
                            name="pickupLocation"
                            value={carData.pickupLocation}
                            onChange={handleCarChange}
                            placeholder="Enter location"
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Drop-off Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                          <input
                            type="text"
                            name="dropoffLocation"
                            value={carData.dropoffLocation}
                            onChange={handleCarChange}
                            placeholder="Enter location"
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
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
                    <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2.5 rounded-md transition-all flex items-center justify-center gap-1.5 shadow hover:shadow-md text-xs" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      <Search size={16} />Search Cars
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ── MOBILE LAYOUT ── */}
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
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        <Icon size={16} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className={`p-4 ${activeTab === 'flights' ? 'max-h-[350px] overflow-y-auto' : ''}`}>

                  {/* FLIGHTS – MOBILE */}
                  {activeTab === 'flights' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>From</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                          <input
                            type="text"
                            name="from"
                            value={flightData.from}
                            onChange={handleFlightChange}
                            placeholder="Lagos (LOS)"
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>To</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                          <input
                            type="text"
                            name="to"
                            value={flightData.to}
                            onChange={handleFlightChange}
                            placeholder="Abuja (ABV)"
                            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
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

                      <SimpleDatePicker
                        value={flightData.departureDate}
                        onChange={(date) => setFlightData(prev => ({ ...prev, departureDate: date }))}
                        label="Departure Date"
                      />

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>Passengers</label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                          <input
                            type="number"
                            name="passengers"
                            value={flightData.passengers}
                            onChange={handleFlightChange}
                            min="1"
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 text-xs"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>Class</label>
                        <div className="relative">
                          <select
                            name="class"
                            value={flightData.class}
                            onChange={handleFlightChange}
                            className="w-full pl-3 pr-8 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 appearance-none cursor-pointer text-xs"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          >
                            <option>Economy</option>
                            <option>Premium Economy</option>
                            <option>Business</option>
                            <option>First Class</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <button
                        onClick={handleSearchFlights}
                        disabled={isSearching}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white font-medium py-3 rounded-md transition-all flex items-center justify-center gap-2 shadow hover:shadow-md text-xs mt-2"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        {isSearching ? (
                          <><Loader size={16} className="animate-spin" />Searching...</>
                        ) : (
                          <><Search size={16} />Search Flights</>
                        )}
                      </button>
                    </div>
                  )}

                  {/* HOTELS – MOBILE */}
                  {activeTab === 'hotels' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>Destination</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                          <input
                            type="text"
                            name="destination"
                            value={hotelData.destination}
                            onChange={handleHotelChange}
                            placeholder="Enter city or hotel name"
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>Guests</label>
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
                            style={{ fontFamily: 'Manrope, sans-serif' }}
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
                      <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 rounded-md transition-all flex items-center justify-center gap-2 shadow hover:shadow-md text-xs mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        <Search size={16} />Search Hotels
                      </button>
                    </div>
                  )}

                  {/* CARS – MOBILE */}
                  {activeTab === 'cars' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>Pick-up Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                          <input
                            type="text"
                            name="pickupLocation"
                            value={carData.pickupLocation}
                            onChange={handleCarChange}
                            placeholder="Enter location"
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>Drop-off Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                          <input
                            type="text"
                            name="dropoffLocation"
                            value={carData.dropoffLocation}
                            onChange={handleCarChange}
                            placeholder="Enter location"
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-gray-900 placeholder:text-gray-400 text-xs"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
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
                      <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 rounded-md transition-all flex items-center justify-center gap-2 shadow hover:shadow-md text-xs mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        <Search size={16} />Search Cars
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}