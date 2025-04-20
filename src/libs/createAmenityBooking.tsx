import { AmenityBooking } from "../../interface"

export default async function createAmenityBooking(token:string,bookingId:string,AmenityItem:AmenityBooking){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/bookings/${bookingId}/amenities/${AmenityItem.amenityTypeId._id}/amenitybookings`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            authorization : `Bearer ${token}`,
        },
        body: JSON.stringify({
            campgroundAmenityId : AmenityItem.amenityTypeId._id,
            amount : AmenityItem.quantity,
            startDate : AmenityItem.startDate,
            endDate : AmenityItem.endDate
        })
    })
    if(!response.ok){   
        throw new Error("Failed to Add Booking")
    }

    return await response.json()
}