export default async function getAmenityBooking(token: string, bookingId: string) {
  console.log(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/amenitybookings/bookings/${bookingId}`);
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/amenitybookings/bookings/${bookingId}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  if(response.status==400){
    return response;
  }
  else if (!response.status) {
    throw new Error("Failed to get Booking");
  }

  return await response.json();
}
