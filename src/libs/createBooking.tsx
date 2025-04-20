export default async function createBooking(token:string,campgroundId:string,name:string,surname:string,startDate:string,endDate:string){
    const response = await fetch(`http://localhost:5000/api/v1/camps/${campgroundId}/bookings`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            authorization : `Bearer ${token}`,
        },
        body: JSON.stringify({
            name : name, 
            surname : surname,
            startDate : startDate,
            endDate : endDate
        })
    })
    if(!response.ok){   
        throw new Error("Failed to Add Booking")
    }

    return await response.json()
}