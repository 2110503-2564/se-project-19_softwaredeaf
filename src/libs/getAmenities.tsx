export async function getAmenities(cid:string){
    await new Promise((resolve)=>setTimeout(resolve,300));
    const response=await fetch(`${process.env.BACKEND}/api/v1/camps/${cid}/amenities`);
        if(!response.ok){
            console.log(response)
            return response.status;
        }
        return await response.json();
}