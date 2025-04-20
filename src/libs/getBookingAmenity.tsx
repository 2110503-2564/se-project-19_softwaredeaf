export default async function getAmenityBooking(token:string,bookingId:string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/amenitybookings/bookings/${bookingId}`,{
        method: "GET",
        headers: {
            authorization : `Bearer ${token}`,
        }
    })
    if(!response.ok){   
        throw new Error("Failed to get Booking")
    }

    return await response.json()
}