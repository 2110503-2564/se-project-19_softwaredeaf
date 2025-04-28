export async function getCampgroundReviews(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/campreviews/${id}`, {
      cache: 'no-store' 
    });
  
    if (!response.ok) {
      console.log(response);
    }
  
    return await response.json();
  }
  