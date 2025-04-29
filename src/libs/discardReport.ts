export default async function discardReports(token: string, reviewId: string) {
  const discardPayload = {
    status: { reported: false },
    report: { reason: "", otherReasonText: "" }
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/reports/${reviewId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(discardPayload), 
  });

  if (!response.ok) {   
    throw new Error("Failed to discard report");
  }

  return await response.json();
}
