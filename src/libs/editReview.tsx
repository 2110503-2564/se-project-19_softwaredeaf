export default async function updateReview(token: string, reviewId: string, data: FormData) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/${reviewId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
  
    if (!response.ok) {
      throw new Error("Failed to update review");
    }
  
    return await response.json();
  }
  