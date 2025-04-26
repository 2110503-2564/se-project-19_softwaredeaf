export default async function getBooking(token:string,query?:string){
    if(!query){
        query = "";
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/bookings${query}`,{
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