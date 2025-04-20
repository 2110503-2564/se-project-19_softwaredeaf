export default async function getCampground(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/camps/${id}`, {
      cache: 'no-store' 
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch campground. Your ID is ${id}`);
    }
  
    return await response.json();
  }
  