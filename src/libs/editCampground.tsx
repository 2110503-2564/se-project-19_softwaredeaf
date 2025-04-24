export default async function editCampground(
    token: string,
    campgroundId: string,
    updateData: FormData
  ) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/camps/${campgroundId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: updateData
    });
  
    if (!response.ok) {
      throw new Error("Failed to edit campground");
    }
  
    return await response.json();
  }
  