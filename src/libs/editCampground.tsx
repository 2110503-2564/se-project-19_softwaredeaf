export default async function editCampground(
    token: string,
    campgroundId: string,
    updateData: {
      name: string;
      address: string;
      district: string;
      province: string;
      postalcode: string;
      tel: string;
      region: string;
    }
  ) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/camps/${campgroundId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });
  
    if (!response.ok) {
      throw new Error("Failed to edit campground");
    }
  
    return await response.json();
  }
  