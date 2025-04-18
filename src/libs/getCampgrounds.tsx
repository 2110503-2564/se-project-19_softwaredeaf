export default async function getCampgrounds(){

    await new Promise((resolve)=>setTimeout(resolve,5000))

    const response = await fetch(`${process.env.BACKEND}/api/v1/camps`);
    //const response = await fetch(`http://localhost:5000/api/v1/camps`)
    console.log(`${process.env.BACKEND}`)
    if(!response.ok){
        throw new Error("Failed to fetch campground")
    }

    return await response.json()
}