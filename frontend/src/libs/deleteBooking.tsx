export default async function deleteBooking(token:string,bookingId:string){
    const response = await fetch(`${BACKEND}/api/v1/bookings/${bookingId}`,{
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