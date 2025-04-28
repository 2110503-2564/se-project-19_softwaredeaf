'use client'
import BookingItem from "@/components/bookingItem";
import { ReservationItem } from "../../interface";
import RatingandReview from "@/components/ratingItem";
import { useState } from "react";
import { FilterButton } from "./FilterButton";
  

export default function BookingList({bookings,user,userrole}:{bookings:ReservationItem[],user:string,userrole:string}) {
    const [isAll,setAll] = useState(true);
    const [isVisited,setVisited] = useState(false);

    const filtered = isAll 
        ? bookings 
        : bookings.filter(b => isVisited ? b.visited : !b.visited);

  return (
    <div className="text-xl text-black h-[60%] py-10 flex flex-col">
      <div className="flex flex-row ml-5 mr-5 items-center justify-center">
        <FilterButton active={isAll} onClick={() => setAll(true)} moreClassname="mr-[20%]">ALL</FilterButton>
        <FilterButton active={!isAll && !isVisited} onClick={() => { setAll(false); setVisited(false); }}>UNVISITED</FilterButton>
        <FilterButton active={!isAll && isVisited} onClick={() => { setAll(false); setVisited(true); }} moreClassname="ml-[20%]">VISITED</FilterButton>
      </div>
      <div>
        {
            filtered && filtered.length > 0 ? 
            filtered.map((book) =>
            book.visited ? (
                <RatingandReview key={book._id} booking={book} token={user} role={userrole}/>
            ) : (
                <div key={book._id} className="my-10 ">
                    <BookingItem booking={book} token={user} />
                </div>
            ))
            :
            <div className="flex justify-center items-center h-[300px]">
                <p className="text-gray-500 text-2xl">No Booking</p>
            </div>
        }
      </div>
    </div>
  );
}
