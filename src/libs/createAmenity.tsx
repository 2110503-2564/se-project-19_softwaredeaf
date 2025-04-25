import { AmenityItem } from "../../interface";

export default async function createAmenity(
    amenity:FormData,campgroundId:string, token:string){
    amenity.append('campgroundId',campgroundId);
    // await new Promise((resolve)=>setTimeout(resolve,300));
    const response=await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/camps/${campgroundId}/amenities`,
        {
            method:'POST',
            headers:{
                "Authorization": `Bearer ${token}`
            },
            body:amenity
        }
    )
    if(!response.ok){
        return response.status;
    }
    return await response.json();
}