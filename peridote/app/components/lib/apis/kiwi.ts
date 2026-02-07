import axios from 'axios';

const KIWI_BASE_URL = 'https://api.kiwicom.com/v2';

export const testKiwiAPI = async () => {
  try {
    // Test search: Lagos to London on March 15, 2025
    const response = await axios.get(`${KIWI_BASE_URL}/search`, {
      params: {
        fly_from: 'LOS',
        fly_to: 'LHR',
        date_from: '2025-03-15',
        date_to: '2025-03-15',
        adults: 1,
        curr: 'NGN',
        limit: 10,
        sort: 'price',
        asc: 1,
        v: 3,
      },
    });

    console.log('✅ Kiwi API Works!');
    return response.data.data || [];
  } catch (error) {
    console.error('❌ Kiwi API Error:', error);
    return [];
  }
};

export const searchKiwiFlights = async (
  from: string,
  to: string,
  date: string,
  returnDate?: string,
  adults: number = 1
) => {
  try {
    const params: any = {
      fly_from: from,
      fly_to: to,
      date_from: date,
      date_to: date,
      adults,
      curr: 'NGN',
      limit: 20,
      sort: 'price',
      asc: 1,
      v: 3,
    };

    if (returnDate) {
      params.return_from = returnDate;
      params.return_to = returnDate;
    }

    const response = await axios.get(`${KIWI_BASE_URL}/search`, { params });
    return response.data.data || [];
  } catch (error) {
    console.error('Kiwi search error:', error);
    return [];
  }
};

export const formatKiwiFlightForDisplay = (flight: any) => {
  const departure = new Date(flight.departure * 1000);
  const arrival = new Date(flight.arrival * 1000);

  const hours = Math.floor(flight.duration / 60);
  const minutes = flight.duration % 60;

  return {
    id: flight.id,
    from: flight.flyFrom,
    to: flight.flyTo,
    departureTime: departure.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    arrivalTime: arrival.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    departureDate: departure.toLocaleDateString('en-US'),
    duration: `${hours}h ${minutes}m`,
    price: flight.price,
    currency: 'NGN',
    priceFormatted: `₦${flight.price.toLocaleString('en-NG')}`,
    stops: flight.routes.length - 1,
    airline: flight.routes[0]?.airline || 'Unknown',
    bookingLink: flight.deep_link,
  };
};