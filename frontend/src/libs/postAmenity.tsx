import { AmenityItem } from "../../interface";
const BACKEND=process.env.NEXT_PUBLIC_BACKEND;

export default async function postAmenity(
    amenity:AmenityItem, cid:string, token:string){
    await new Promise((resolve)=>setTimeout(resolve,300));
    const response=await fetch(`${BACKEND}/api/v1/campgrounds/${cid}/amenities`,
        {
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify(amenity),
        }
    )
    if(!response.ok){
        return response.status;
    }
    return await response.json();
}