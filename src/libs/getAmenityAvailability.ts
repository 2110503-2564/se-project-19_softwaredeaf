// getAmenityAvailability.ts

export interface AmenityBooking {
  campgroundAmenityId: string;
  amount: number;
}

export interface Amenity {
  _id: string;
  name: string;
  quantity: number;
  [key: string]: any;
}

interface AmenityWithAvailability extends Amenity {
  booked: number;
  available: number;
}

export default function getAmenityAvailability(
  amenities: Amenity[],
  bookings: AmenityBooking[]
): AmenityWithAvailability[] {
  const bookingMap: Record<string, number> = {};

  for (const booking of bookings) {
    const id = booking.campgroundAmenityId;
    bookingMap[id] = (bookingMap[id] || 0) + booking.amount;
  }

  return amenities.map((amenity) => {
    const booked = bookingMap[amenity._id] || 0;
    const available = Math.max(0, amenity.quantity - booked);

    return {
      ...amenity,
      booked,
      available,
    };
  });
}
