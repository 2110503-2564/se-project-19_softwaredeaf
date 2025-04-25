//ยังไม่ได้ลอง
export default async function getCampgroundReviews(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/campReviews/${id}`, {
      cache: 'no-store' 
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch campground. Your ID is ${id}`);
    }
  
    return await response.json();
  }
  