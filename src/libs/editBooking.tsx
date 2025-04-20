export default async function editBooking(token:string,bookingId:string,name:string,surname:string,startDate:string,endDate:string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/bookings/${bookingId}`,{
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
            authorization : `Bearer ${token}`,
        },
        body: JSON.stringify({
            name:name,
            surname:surname,
            startDate:startDate,
            endDate:endDate
        })
    })
    if(!response.ok){   
        throw new Error("Failed to Add Booking")
    }

    return await response.json()
}