export default async function deleteAmenityBookingByBookingId(token:string,bookingId:string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/amenitybookings/bookings/${bookingId}`,{
        method: "DELETE",
        headers: {
            authorization : `Bearer ${token}`,
        }
    })
    if(!response.ok){   
        throw new Error("Failed to Delete Booking")
    }

    return await response.json()
}