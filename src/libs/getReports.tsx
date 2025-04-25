export default async function getReports(token:string,searchUser:string,searchCamp:string){
    console.log("get report: ", searchUser,searchCamp);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/reports?username=${searchUser}&campname=${searchCamp}`,{
        method: "GET",
        headers: {
            authorization : `Bearer ${token}`,
        }
    })
    if(!response.ok){   
        throw new Error("Failed to Get reports")
    }

    return await response.json()
}