//Done
import BookingItem from "@/components/bookingItem";
import { ReservationItem } from "../../../interface";
import deleteBooking from "@/libs/deleteBooking";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import getBooking from "@/libs/getBooking";

export default async function myBooking(){
  const session = await getServerSession(authOptions);
  const user=session?.user.token;
  
  console.log(user);
  //mock booking of the user
  if(!user) return null;
  const bookingJson = await getBooking(user);
  const bookings:ReservationItem[] = bookingJson.data;
      const handleDelete = async (bid: string) => {
        await deleteBooking(user, bid);
      };

    return(
        <div className="text-xl text-black h-[60%] py-10">
        {
            bookings.length > 0 ?
              bookings.map((book)=>(
                    <div className="my-10">
                        <BookingItem booking={book} token={user}/>
                    </div>
                ))

            : <p>No booking</p>
        }
        </div>
    )
}