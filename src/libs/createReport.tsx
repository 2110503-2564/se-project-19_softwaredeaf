export default async function createReports(
    token: string,
    reviewId: string,
    report: { status: { reported: boolean }; report: { reason: string; otherReasonText?: string } }
  ) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/reports/${reviewId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(report), 
    });
  
    if (!response.ok) {   
      throw new Error("Failed to create report");
    }
  
    return await response.json();
} 