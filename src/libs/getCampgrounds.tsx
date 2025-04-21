export default async function getCampgrounds(user?:string) {
    // await new Promise((resolve) => setTimeout(resolve, 5000));


    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/camps`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user}`, 
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch campground");
    }

    return await response.json();
}