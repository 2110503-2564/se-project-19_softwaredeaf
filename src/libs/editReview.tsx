export default async function editReview(token: string, reviewId: string, data: FormData) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/reviews/${reviewId}`, {
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
