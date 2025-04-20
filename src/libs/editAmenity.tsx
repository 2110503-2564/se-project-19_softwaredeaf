import { AmenityItem } from "../../interface"
export default async function editAmenity(token:string,amenity:AmenityItem){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/camps/${amenity.campgroundId?._id}/amenities/${amenity._id}`,{
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
            authorization : `Bearer ${token}`,
        },
        body: JSON.stringify({
            name:amenity.name,
            description:amenity.description,
            quantity:amenity.quantity,
            price:amenity.price,
        })
    })
    if(!response.ok){   
        throw new Error("Failed to edit amenity")
    }

    return await response.json()
}