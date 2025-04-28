export default async function deleteReview(token: string, reviewId: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete review");
    }
  
    return await response.json();
  }
  