export default async function getAllAmenityBookings(token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/amenitybookings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch amenity bookings");
    }
  
    return await response.json(); // should return { success: true, data: [...] }
  }
  