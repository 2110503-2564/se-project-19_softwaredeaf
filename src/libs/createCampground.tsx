export default async function createCampground(
    token: string,
    newData: {
      name: string;
      address: string;
      district: string;
      province: string;
      postalcode: string;
      tel: string;
      region: string;
    }
  ) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/camps`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    });
  
    if (!response.ok) {
      throw new Error("Failed to create campground");
    }
  
    return await response.json();
  }
  