export default async function getCampground(id:string){
    const response = await fetch(`${process.env.BACKEND}/api/v1/campgrounds/${id}`)
    if(!response.ok){
        throw new Error("Failed to fetch campground")
    }

    return await response.json()

}