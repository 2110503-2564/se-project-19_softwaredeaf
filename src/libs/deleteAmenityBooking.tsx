export default async function deleteAmenityBooking(token:string,amenitybookingId:string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/amenitybookings/${amenitybookingId}`,{
        method: "DELETE",
        headers: {
            authorization : `Bearer ${token}`,
        }
    })
    if(!response.ok){   
        throw new Error("Failed to Delete Amenity Booking")
    }

    return await response.json()
}