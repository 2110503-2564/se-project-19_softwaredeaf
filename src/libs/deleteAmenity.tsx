export default async function deleteAmenity(token:string,campgroundId:string,amenityId:string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/camps/${campgroundId}/amenities/${amenityId}`,{
        method: "DELETE",
        headers: {
            authorization : `Bearer ${token}`,
        }
    })
    if(!response.ok){   
        throw new Error("Failed to Delete Amenity")
    }

    return await response.json()
}