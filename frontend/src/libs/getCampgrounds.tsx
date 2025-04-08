export async function getAmenities(cid:string,token:string){
    await new Promise((resolve)=>setTimeout(resolve,300));
    const response=await fetch(`${BACKEND}/api/v1/campgrounds/${cid}/amenities`);
        if(!response.ok){
            return response.status;
        }
        return await response.json();
}