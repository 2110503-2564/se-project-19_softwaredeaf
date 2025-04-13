export default async function booking(token:string,campgroundId:string,checkin:string,nights:number){
    const response = await fetch(`${process.env.BACKEND}/api/v1/campgrounds/${campgroundId}/bookings/`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            authorization : `Bearer ${token}`,
        },
        body: JSON.stringify({
            campingDate : checkin,
            nights : nights
        })
    })
    if(!response.ok){   
        throw new Error("Failed to Add Booking")
    }

    return await response.json()
}