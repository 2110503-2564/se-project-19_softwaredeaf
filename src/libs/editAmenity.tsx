import { AmenityItem } from "../../interface"
export default async function editAmenity(token:string,amenity:FormData){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/camps/${amenity.get('campgroundId')}/amenities/${amenity.get('id')}`,{
        method: "PUT",
        headers: {
            authorization : `Bearer ${token}`
        },
        body: amenity
    })
    if(!response.ok){   
        throw new Error("Failed to edit amenity")
    }

    return await response.json()
}