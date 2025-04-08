export default async function getCampground(id:string){
    const response = await fetch(`${BACKEND}/api/v1/campgrounds/${id}`)
    if(!response.ok){
        throw new Error("Failed to fetch campground")
    }

    return await response.json()

}