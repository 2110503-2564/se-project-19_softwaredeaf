export default async function editBookingStatus(token:string,bookingId:string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/bookings/${bookingId}`,{
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
            authorization : `Bearer ${token}`,
        },
        body: JSON.stringify({
            bookstatus:true
        })
    })
    if(!response.ok){   
        throw new Error("Failed to Add Booking")
    }

    return await response.json()
}