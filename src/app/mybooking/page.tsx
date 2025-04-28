import BookingItem from "@/components/bookingItem";
import { ReservationItem } from "../../../interface";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import getBooking from "@/libs/getBooking";
import RatingandReview from "@/components/ratingItem";
import BookingList from "@/components/BookingList";

export default async function myBooking() {
  const session = await getServerSession(authOptions);
  const user = session?.user.token;
  console.log(user);
  //mock booking of the user
  if (!user) return null;
  const bookingJson = await getBooking(user);
  const bookings: ReservationItem[] = bookingJson.data;

  return (
    <div className="text-xl text-black h-[60%] py-10">
      {bookings.length > 0 ? (
        <BookingList bookings={bookings} user={user} userrole={session?.user.role}/>
      ) : (
        <div className="flex justify-center items-center h-[300px]">
          <p className="text-gray-500 text-2xl">No Booking</p>
        </div>
      )}
    </div>
  );
}
