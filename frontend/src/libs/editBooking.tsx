export default async function editBooking(token:string,bookingId:string,checkin:string){
    const response = await fetch(`${BACKEND}/api/v1/bookings/${bookingId}`,{
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
            authorization : `Bearer ${token}`,
        },
        body: JSON.stringify({
            campingDate : checkin
        })
    })
    if(!response.ok){   
        throw new Error("Failed to Add Booking")
    }

    return await response.json()
}