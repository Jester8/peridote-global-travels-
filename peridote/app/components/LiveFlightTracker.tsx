"use client";
import { useEffect, useState } from 'react';
import { 
  getFlightsNearLagos, 
  FormattedFlight,
  getWestAfricaFlights,
  getAllAfricaFlights,
  getAllGlobalFlights 
} from './lib/apis/opensky';
import { Plane, RefreshCw, MapPin, Gauge, TrendingUp, Globe, Map } from 'lucide-react';

export default function LiveFlightTracker() {
  const [flights, setFlights] = useState<FormattedFlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [viewMode, setViewMode] = useState<'west-africa' | 'africa' | 'global'>('west-africa');

  const fetchFlights = async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      switch (viewMode) {
        case 'west-africa':
          data = await getFlightsNearLagos();
          break;
        case 'africa':
          data = await getAllAfricaFlights();
          break;
        case 'global':
          data = await getAllGlobalFlights();
          break;
        default:
          data = await getFlightsNearLagos();
      }
      setFlights(data);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error fetching flights:', err);
      setError('Failed to fetch live flight data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
    
    if (!autoRefresh) return;

    const interval = setInterval(fetchFlights, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, [autoRefresh, viewMode]);

  const getViewModeTitle = () => {
    switch (viewMode) {
      case 'west-africa':
        return 'West Africa';
      case 'africa':
        return 'All Africa';
      case 'global':
        return 'Global';
      default:
        return 'West Africa';
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-2xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Plane className="text-cyan-500 animate-bounce" size={32} />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Live Flight Tracker
            </h1>
            <p className="text-sm text-gray-600">
              Real-time aircraft positions • {getViewModeTitle()}
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('west-africa')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                viewMode === 'west-africa'
                  ? 'bg-white text-cyan-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              West Africa
            </button>
            <button
              onClick={() => setViewMode('africa')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                viewMode === 'africa'
                  ? 'bg-white text-cyan-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Africa
            </button>
            <button
              onClick={() => setViewMode('global')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                viewMode === 'global'
                  ? 'bg-white text-cyan-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Global
            </button>
          </div>
          
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              autoRefresh
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-300 text-gray-700'
            }`}
          >
            {autoRefresh ? 'Auto-updating' : 'Paused'}
          </button>
          <button
            onClick={fetchFlights}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white rounded-lg transition font-medium text-sm"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* Last Update */}
      {lastUpdate && (
        <p className="text-xs text-gray-600 mb-4">
          Last updated: {lastUpdate.toLocaleTimeString()} •
          {flights.length} aircraft detected •
          Viewing: {getViewModeTitle()}
        </p>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
          ⚠️ {error}
        </div>
      )}

      {/* Loading State */}
      {loading && flights.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <Plane size={48} className="text-cyan-400 animate-spin mb-4 mx-auto" />
            <p className="text-gray-600 font-medium">Loading live flight data...</p>
          </div>
        </div>
      ) : flights.length > 0 ? (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {flights.slice(0, 100).map((flight, idx) => (
            <div
              key={`${flight.icao24}-${idx}`}
              className="bg-white rounded-xl p-4 hover:shadow-lg transition-all border-l-4 border-cyan-500 hover:border-cyan-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Flight Callsign */}
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow">
                    <Plane className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-900">
                      {flight.callsign}
                    </p>
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      {flight.country}
                      {viewMode === 'global' && flight.distanceFromLagos && (
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                          📍 {flight.distanceFromLagos.toLocaleString('en-US', {
                            maximumFractionDigits: 0,
                          })} km
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Flight Data - Desktop */}
                <div className="hidden md:flex items-center gap-4 md:col-span-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp size={14} className="text-gray-500" />
                      <span className="text-xs text-gray-600 font-semibold">
                        ALTITUDE
                      </span>
                    </div>
                    <p className="font-bold text-gray-900">{flight.altitude}</p>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Gauge size={14} className="text-gray-500" />
                      <span className="text-xs text-gray-600 font-semibold">
                        SPEED
                      </span>
                    </div>
                    <p className="font-bold text-gray-900">{flight.speed}</p>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={14} className="text-gray-500" />
                      <span className="text-xs text-gray-600 font-semibold">
                        HEADING
                      </span>
                    </div>
                    <p className="font-bold text-gray-900">{flight.heading}</p>
                  </div>
                </div>

                {/* Position & Distance */}
                <div className="flex flex-col items-end justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      flight.isOnGround
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {flight.status}
                  </span>
                  
                  {flight.distanceFromLagos && viewMode !== 'global' && (
                    <p className="text-xs text-gray-600 text-right mt-1">
                      {flight.distanceFromLagos.toLocaleString('en-US', {
                        maximumFractionDigits: 0,
                      })} km from Lagos
                    </p>
                  )}
                </div>
              </div>

              {/* Mobile Details */}
              <div className="md:hidden mt-3 pt-3 border-t border-gray-200 grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="text-gray-600 font-semibold">Altitude</p>
                  <p className="font-bold text-gray-900">{flight.altitude}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Speed</p>
                  <p className="font-bold text-gray-900">{flight.speed}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Heading</p>
                  <p className="font-bold text-gray-900">{flight.heading}</p>
                </div>
              </div>

              {/* Position Info */}
              <p className="text-xs text-gray-500 mt-3 font-mono">
                📍 {flight.latitude.toFixed(4)}°N, {flight.longitude.toFixed(4)}°E
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg font-medium">No flights detected</p>
          <p className="text-gray-500 text-sm mt-2">
            Try expanding the search area or check back shortly
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-300">
        <p className="text-xs text-gray-600">
          📡 Data from OpenSky Network • No API key required
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Updates every 30 seconds • Showing top {flights.length > 100 ? 100 : flights.length} flights in {getViewModeTitle().toLowerCase()}
        </p>
      </div>
    </div>
  );
}