export default async function getCampground(id:string){
    // const response = await fetch(`${process.env.BACKEND}/api/v1/campgrounds/${id}`)
    // const response = await fetch('http://localhost:5000/api/v1/camps/68026e154c754ca12a382720');
    const response = await fetch(`http://localhost:5000/api/v1/camps/${id}`)
    if(!response.ok){
        throw new Error(`Failed to fetch campground your id is ${id}`)
    }
    return await response.json()

}