import BookingItem from "@/components/bookingItem";
import { ReservationItem } from "../../../interface";
export default async function myBooking(){
    //mock booking of the user
    const bookings:ReservationItem[]=[
        {
          "_id":"107",
          "campground": {
            "_id":"68026e154c754ca12a382720",
            "name": "Pine Valley Campground",
            "address": "123 Forest Lane",
            "district": "Northwood",
            "province": "British Columbia",
            "postalcode": "V0N 1B2",
            "tel": "604-555-0192",
            "region": "West Coast"
          },
          "campingDate": "2025-05-20",
          "nights": 3,
          "user": {
            "_id": "user001",
            "name": "Alice Smith",
            "email": "alice@example.com"
          }
        },
        {
          "_id":"107",
          "campground": {
            "_id":"68026e154c754ca12a382720",
            "name": "Pine Valley Campground",
            "address": "123 Forest Lane",
            "district": "Northwood",
            "province": "British Columbia",
            "postalcode": "V0N 1B2",
            "tel": "604-555-0192",
            "region": "West Coast"
          },
          "campingDate": "2025-05-20",
          "nights": 3,
          "user": {
            "_id": "user001",
            "name": "Alice Smith",
            "email": "alice@example.com"
          }
        },
        {
          "_id":"107",
          "campground": {
            "_id":"68026e154c754ca12a382720",
            "name": "Pine Valley Campground",
            "address": "123 Forest Lane",
            "district": "Northwood",
            "province": "British Columbia",
            "postalcode": "V0N 1B2",
            "tel": "604-555-0192",
            "region": "West Coast"
          },
          "campingDate": "2025-05-20",
          "nights": 3,
          "user": {
            "_id": "user001",
            "name": "Alice Smith",
            "email": "alice@example.com"
          }
        }
      ]      
      ;
    return(
        <div className="text-xl text-black h-[60%] py-10">
        {
            bookings.length>0 ?
                bookings.map((book)=>(
                    <div className="my-10">
                        <BookingItem booking={book} />
                    </div>
                ))

            : <p>No booking</p>
        }

            
            
        </div>
    )
}