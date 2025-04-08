export default async function getBooking(token:string){
    const response = await fetch(`${process.env.BACKEND}/api/v1/bookings`,{
        method: "GET",
        headers: {
            authorization : `Bearer ${token}`,
        }
    })
    if(!response.ok){   
        throw new Error("Failed to Delete Booking")
    }

    return await response.json()
}