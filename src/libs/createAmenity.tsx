import { AmenityItem } from "../../interface";

export default async function createAmenity(
    amenity:AmenityItem,campgroundId:string, token:string){
    await new Promise((resolve)=>setTimeout(resolve,300));
    const response=await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/camps/${campgroundId}/amenities`,
        {
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify({
                name:amenity.name,
                description:amenity.description,
                quantity:amenity.quantity,
                price:amenity.price,
                campgroundId:campgroundId
            }),
        }
    )
    if(!response.ok){
        return response.status;
    }
    return await response.json();
}