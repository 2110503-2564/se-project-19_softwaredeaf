export default async function getCampgrounds(){

    await new Promise((resolve)=>setTimeout(resolve,5000))

    const response = await fetch(`${BACKEND}/api/v1/campgrounds`)
    if(!response.ok){
        throw new Error("Failed to fetch campground")
    }

    return await response.json()
}