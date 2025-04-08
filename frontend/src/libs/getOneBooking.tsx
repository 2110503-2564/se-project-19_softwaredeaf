export default async function getOneBooking(token:string,id:string){
    const response = await fetch(`${BACKEND}/api/v1/bookings/${id}`,{
        method: "GEt",
        headers: {
            authorization : `Bearer ${token}`,
        }
    })
    if(!response.ok){   
        throw new Error("Failed to Get ONE Booking")
    }

    return await response.json()

}