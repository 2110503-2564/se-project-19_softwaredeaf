export default async function createCampground(
    token: string,
    newData: FormData
  ) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/camps`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: newData
    });
  
    if (!response.ok) {
      throw new Error("Failed to create campground");
    }
  
    return await response.json();
  }
  