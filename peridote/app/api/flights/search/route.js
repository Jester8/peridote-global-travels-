// app/api/flights/search/route.js

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const fly_from = searchParams.get('fly_from');
  const fly_to = searchParams.get('fly_to');
  const date_from = searchParams.get('date_from'); // expects YYYY-MM-DD
  const adults = searchParams.get('adults') || '1';

  try {
    const response = await fetch('https://ignav.com/api/fares/one-way', {
      method: 'POST',
      headers: {
        'X-Api-Key': process.env.IGNAV_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        origin: fly_from,
        destination: fly_to,
        departure_date: date_from,
        passengers: parseInt(adults),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('IGNav API error:', response.status, errorText);
      throw new Error(`IGNav API returned ${response.status}`);
    }

    const data = await response.json();
    const flights = transformIGNavFlights(data, fly_from, fly_to);
    return Response.json({ data: flights });

  } catch (error) {
    console.error('Flight search error:', error);
    return Response.json(
      { error: 'Failed to search flights. Please try again.' },
      { status: 500 }
    );
  }
}

function transformIGNavFlights(ignavData, originCode, destinationCode) {
  if (!ignavData?.itineraries) return [];

  return ignavData.itineraries.map((itinerary, index) => {
    const segment = itinerary.outbound?.segments?.[0] || {};
    const allSegments = itinerary.outbound?.segments || [];
    const lastSegment = allSegments[allSegments.length - 1] || {};

    const depTime = segment.departure_time_local?.split('T')[1]?.slice(0, 5) || '00:00';
    const arrTime = lastSegment.arrival_time_local?.split('T')[1]?.slice(0, 5) || '00:00';
    const durationMins = itinerary.outbound?.duration_minutes || 0;
    const hours = Math.floor(durationMins / 60);
    const mins = durationMins % 60;

    return {
      id: itinerary.ignav_id || `flight_${index}`,
      airline: segment.operating_carrier_name || segment.marketing_carrier_code || 'Airline',
      flightNumber: `${segment.marketing_carrier_code || ''}${segment.flight_number || ''}`,
      from: segment.departure_airport || originCode,
      to: lastSegment.arrival_airport || destinationCode,
      departureTime: depTime,
      arrivalTime: arrTime,
      departureDate: segment.departure_time_local?.split('T')[0] || '',
      duration: `${hours}h ${mins}m`,
      stops: allSegments.length - 1,
      price: itinerary.price?.amount || 0,
      currency: itinerary.price?.currency || 'USD',
      priceFormatted: formatPrice(itinerary.price?.amount || 0, itinerary.price?.currency || 'USD'),
      bookingLink: `https://ignav.com/book/${itinerary.ignav_id}`,
    };
  });
}

function calculateDuration(departureTime, arrivalTime) {
  const dep = new Date(`2000-01-01T${departureTime}`);
  const arr = new Date(`2000-01-01T${arrivalTime}`);
  let diff = (arr - dep) / (1000 * 60);
  if (diff < 0) diff += 24 * 60;
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  return `${hours}h ${minutes}m`;
}

function formatPrice(price, currency) {
  const symbols = { USD: '$', EUR: '€', GBP: '£', NGN: '₦' };
  const symbol = symbols[currency] || currency;
  return `${symbol}${price.toLocaleString()}`;
}