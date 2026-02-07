// lib/flights.ts
export const searchFlights = async (
  from: string,
  to: string,
  date: string,
  returnDate?: string,
  adults: number = 1
) => {
  // Generate realistic mock data
  const basePrice = getBasePrice(from, to);
  const flightDate = new Date(date);
  
  const airlines = ['Air Peace', 'Arik Air', 'Dana Air', 'Ibom Air', 'United Nigeria'];
  const flights = [];

  for (let i = 0; i < 8; i++) {
    const departureHour = 6 + (i * 2);
    const duration = getDuration(from, to);
    const airline = airlines[i % airlines.length];
    
    const departure = new Date(flightDate);
    departure.setHours(departureHour, Math.floor(Math.random() * 60));
    
    const arrival = new Date(departure);
    arrival.setMinutes(arrival.getMinutes() + duration);

    const priceVariation = 0.8 + (Math.random() * 0.4); // 80-120% of base
    const price = Math.round(basePrice * priceVariation);

    flights.push({
      id: `${from}-${to}-${i}`,
      from,
      to,
      departureTime: departure.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      arrivalTime: arrival.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      departureDate: departure.toLocaleDateString('en-US'),
      duration: formatDuration(duration),
      price,
      currency: 'NGN',
      priceFormatted: `₦${price.toLocaleString('en-NG')}`,
      stops: Math.random() > 0.7 ? 1 : 0,
      airline,
      bookingLink: buildGoogleFlightsLink(from, to, date, returnDate, adults),
    });
  }

  return flights.sort((a, b) => a.price - b.price);
};

function getBasePrice(from: string, to: string): number {
  // Realistic Nigerian domestic flight prices
  const routes: Record<string, number> = {
    'LOS-ABV': 45000,
    'ABV-LOS': 45000,
    'LOS-PHC': 40000,
    'PHC-LOS': 40000,
    'LOS-KAN': 50000,
    'KAN-LOS': 50000,
    'ABV-PHC': 48000,
    'PHC-ABV': 48000,
  };

  return routes[`${from}-${to}`] || 55000;
}

function getDuration(from: string, to: string): number {
  // Duration in minutes
  const durations: Record<string, number> = {
    'LOS-ABV': 75,
    'ABV-LOS': 75,
    'LOS-PHC': 70,
    'PHC-LOS': 70,
    'LOS-KAN': 90,
    'KAN-LOS': 90,
    'ABV-PHC': 85,
    'PHC-ABV': 85,
  };

  return durations[`${from}-${to}`] || 80;
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

function buildGoogleFlightsLink(
  from: string,
  to: string,
  date: string,
  returnDate?: string,
  adults: number = 1
): string {
  const baseUrl = 'https://www.google.com/travel/flights';
  const formattedDate = date.replace(/-/g, '');
  
  let url = `${baseUrl}?q=flights+from+${from}+to+${to}+on+${formattedDate}`;
  
  if (returnDate) {
    const formattedReturn = returnDate.replace(/-/g, '');
    url += `+return+${formattedReturn}`;
  }
  
  if (adults > 1) {
    url += `+${adults}+adults`;
  }

  return url;
}