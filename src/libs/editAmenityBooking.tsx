import { AmenityBooking } from "../../interface"
export default async function editAmenityBooking(token:string,amenity:AmenityBooking){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/amenitybookings/${amenity._id}`,{
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
            authorization : `Bearer ${token}`,
        },
        body: JSON.stringify({
            campgroundAmenityId:amenity.amenityTypeId._id,
            amount:amenity.quantity,
            startDate:amenity.startDate,
            endDate:amenity.endDate
        })
    })
    if(!response.ok){   
        throw new Error("Failed to edit amenity Booking")
    }

    return await response.json()
}