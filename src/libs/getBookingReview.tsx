export default async function getBookingReview(token:string,bid: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/userreviews/${bid}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
    if (response.status === 400) {
        return response;
    }
    else if (!response.status) {
        throw new Error("Failed to get review");
    }

    return await response.json();
}
