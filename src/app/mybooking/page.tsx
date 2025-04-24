
import BookingItem from "@/components/bookingItem";
import { ReservationItem } from "../../../interface";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import getBooking from "@/libs/getBooking";
import Review from "@/components/Review";
export default async function myBooking(){
  const session = await getServerSession(authOptions);
  const user=session?.user.token;
  
  console.log(user);
  //mock booking of the user
  if(!user) return null;
  const bookingJson = await getBooking(user);
  const bookings:ReservationItem[] = bookingJson.data;

    return(
        <div className="text-xl text-black h-[60%] py-10">
        {
            bookings.length > 0 ?
              bookings.map((book)=>(
                    <div className="my-10">
                        <BookingItem booking={book} token={user}/>
                        {/* test review+report butt */}
                        <Review name='test' comment='test' rating={5} role='user' />
                    </div>
                ))

            : <p>No booking</p>
        }
        </div>
    )
}