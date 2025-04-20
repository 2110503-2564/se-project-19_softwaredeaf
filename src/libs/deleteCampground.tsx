export default async function deleteCampground(id: string, token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/camps/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); // กรณีที่ API ส่งข้อความผิดพลาดใน body
      throw new Error(`Failed to delete campground with ID: ${id}. Status: ${response.status} - ${response.statusText}. ${errorData.message || ''}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting campground:", error);
    throw error;
  }
}
