"use client";
import BookedAmenityList from "@/components/BookedAmenityList";
import dayjs from "dayjs";
import deleteBooking from "@/libs/deleteBooking";
import deleteAmenityBookingByBookingId from "@/libs/deleteAmenityBookingByBookingId";
import { ReservationItem } from "../../interface";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function BookingItem({
  booking,
  token,
  rt
}: {
  booking: ReservationItem;
  token: string;
  rt?:boolean
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (bid: string) => {
    setIsDeleting(true);
    try {
      await deleteAmenityBookingByBookingId(token, bid);
      await deleteBooking(token, bid);
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    } finally {
      alert("Delete Booking Success!");
      router.push("/mybooking");
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col w-[90%] bg-white text-black font-bold border border-[#A4B465] rounded-[40px] mx-auto my-20 shadow-lg">
          {/* Header Section */}
          <div className="flex flex-row">
            <div className="w-[20%] h-[250px] rounded-l-[40px] bg-neutral-200">
              <Image
                alt="campground"
                src={booking.camp.picture}
                height={1080}
                width={1920}
                className="w-full h-full object-cover rounded-l-[40px]"
              ></Image>
            </div>
            {/* Campground & Date Info */}
            <div className="w-[45%] px-5">
              <div className="flex flex-row gap-5">
                <div className="w-[50%]">
                  <p className="mt-5">Campground:</p>
                  <div className="bg-[#D9D9D9] mt-2 px-3 py-1 rounded-md text-base font-light w-[100%]">
                    {booking.camp.name}
                  </div>
                </div>
                <div className="w-[50%] flex flex-row item-center justify-center">
                  <Link href={`/mybooking/${booking._id}/edit`}>
                    <button className="mt-5 w-16 h-16 rounded-full bg-[#FFB900] flex items-center justify-center shadow-md hover:bg-[#FAD164]
                                transition-all duration-300 ease-in-out">
                      <img src="/img/edit.png" alt="Edit" className="w-6 h-6" />
                    </button>
                  </Link>
                  <button
                    className="mt-5 w-16 h-16 ml-[20%] rounded-full bg-[#C46B65] flex items-center justify-center shadow-md hover:bg-[#ED3E32]
                                transition-all duration-300 ease-in-out"
                    disabled={isDeleting}
                    onClick={() => handleDelete(booking._id)}
                  >
                    <img src="/img/delete.png" alt="Delete" className="w-6 h-6" />
                  </button>
                </div>
              </div>
    
              {/* Date Section */}
              <div className="mt-5 mb-5">
                <p className="mb-2">Date:</p>
                <div className="flex gap-5">
                  <div className="w-[50%]">
                    <p className="text-sm mb-1">From:</p>
                    <div className="bg-[#D9D9D9] px-3 py-1 rounded-md text-base font-light">
                      {dayjs(booking.startDate).format("DD/MM/YYYY")}
                    </div>
                  </div>
                  <div className="w-[50%]">
                    <p className="text-sm mb-1">To:</p>
                    <div className="bg-[#D9D9D9] px-3 py-1 rounded-md text-base font-light">
                      {dayjs(booking.endDate).format("DD/MM/YYYY")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
            {/* Amenity List Section */}
            <div className="pl-5 w-[35%]">
              <BookedAmenityList token={token} bid={booking._id} rt={rt}/>
            </div>
          </div>
    
          
        </div>
  );
}
