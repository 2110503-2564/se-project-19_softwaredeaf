export default async function createReview(
    token: string,
    newData: FormData
  ) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/userreviews/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: newData
    });
  
    if (!response.ok) {
      throw new Error("Failed to create review");
    }
  
    return await response.json();
  }
  