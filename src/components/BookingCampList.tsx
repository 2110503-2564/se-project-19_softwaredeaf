"use client";
import { useState } from "react";
import { ReservationItem } from "../../interface";
import Image from "next/image";
import dayjs from "dayjs";
import BookedAmenityList from "./BookedAmenityList";
import Link from "next/link";
import deleteAmenityBookingByBookingId from "@/libs/deleteAmenityBookingByBookingId";
import deleteBooking from "@/libs/deleteBooking";
import { useRouter } from "next/navigation";
import editBookingStatus from "@/libs/editBookingStatus";
import { FilterButton } from "./FilterButton";

export default function BookingCampgroundList({
  bookings,
  token,
}: {
  bookings: ReservationItem[];
  token: string;
}) {
  const [isViewBooking, setViewBooking] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isViewConfirm, setViewConfirm] = useState(false);
  const router = useRouter();
  const now = dayjs();

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
      router.push(`/campground`);
      setIsDeleting(false);
    }
  };

  const filtered = bookings.filter(b => isViewConfirm ? b.visited : !b.visited);

  const handleConfirm = async (bid: string) => {
    const newForm = new FormData();
    newForm.append("bookstatus", "true");
    try {
      await editBookingStatus(token, bid);
    } catch (error) {
      console.log(error);
      alert("Confirm failed");
    } finally {
      alert("Confirm Booking!");
    }
  };

  const toggleReviews = () => {
    setViewBooking((prev) => !prev);
  };

  return (
    <div>
      {bookings.length > 0 ? (
        <div className="mt-5 mb-5">
          <div className="flex flex-row ">
            <p className="text-4xl text-black font-semibold py-5">Booking</p>
            <h2
              className={`text-xl font-semibold cursor-pointer flex items-center ml-4 mt-1 text-black hover:text-gray-200 transition-transform duration-300 ${
                isViewBooking ? "rotate-180" : "rotate-0"
              }`}
              onClick={toggleReviews}
            >
              ▼
            </h2>
          </div>
          {
            isViewBooking ? 
            <div className="flex flex-row items-center justify-center w-[100%] mb-10">
                <FilterButton onClick={()=>setViewConfirm(false)} active={!isViewConfirm} moreClassname="mr-[20%]">UNCONFIRMED</FilterButton>
                <FilterButton onClick={()=>setViewConfirm(true)} active={isViewConfirm}>CONFIRMED</FilterButton>
            </div>
            : null
          }
          <div>
            {isViewBooking ? (
              <div>
                {filtered.map((booking) => (
                  <div className="flex flex-col w-[100%] bg-white text-black font-bold border border-[#A4B465] rounded-[40px] mb-5 shadow-lg">
                    <div className="flex flex-row">
                      <div className="w-[20%] bg-neutral-200 rounded-l-[40px]">
                        <Image
                          alt="campground"
                          src={booking.camp.picture}
                          height={1080}
                          width={1920}
                          className="w-full h-full object-cover rounded-l-[40px]"
                        ></Image>
                      </div>

                      {/* Campground & Date Info */}
                      <div className="w-[45%] px-10">
                        <div className="flex flex-row gap-5">
                          <div className="w-[50%]">
                            <p className="mt-7">Campground:</p>
                            <div className="bg-[#D9D9D9] mt-2 px-3 py-1 rounded-md text-base font-light w-[100%]">
                              {booking.camp.name}
                            </div>
                          </div>
                          <div className="w-[50%] flex flex-col items-center justify-center">
                            <div className="flex flex-row items-center justify-center">
                              <Link href={`/mybooking/${booking._id}/edit`}>
                                <button
                                  className="mt-5 w-12 h-12 rounded-full bg-[#FFB900] flex items-center justify-center shadow-md hover:bg-[#FAD164]
                                transition-all duration-300 ease-in-out"
                                >
                                  <img
                                    src="/img/edit.png"
                                    alt="Edit"
                                    className="w-6 h-6"
                                  />
                                </button>
                              </Link>
                              <button
                                className="mt-5 ml-10 w-12 h-12 rounded-full bg-[#C46B65] flex items-center justify-center shadow-md  hover:bg-[#ED3E32]
                                transition-all duration-300 ease-in-out"
                                disabled={isDeleting}
                                onClick={() => handleDelete(booking._id)}
                              >
                                <img
                                  src="/img/delete.png"
                                  alt="Delete"
                                  className="w-6 h-6"
                                />
                              </button>
                            </div>
                            <div className="flex items-center justify-center">
                              {booking.visited ? null : (
                                <button
                                  type="button"
                                  className="text-xl h-[40px] bg-[#65C465] text-black font-semibold py-1 px-1 mt-4 rounded-xl hover:bg-[#B5DE62] 
                                        disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ease-in-out"
                                  disabled={now.isBefore(
                                    dayjs(booking.endDate)
                                  )}
                                  onClick={(e) => {
                                    handleConfirm(booking._id);
                                  }}
                                >
                                  Confirm Booking
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="w-[50%]">
                          <p className="mt-3">Booker:</p>
                          <div className="bg-[#D9D9D9] px-3 py-1 rounded-md text-base font-light w-[100%]">
                            {booking.name} {booking.surname}
                          </div>
                        </div>

                        {/* Date Section */}
                        <div className="mb-4 mt-4">
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
                        <BookedAmenityList token={token} bid={booking._id} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="mt-5 mb-5">
          <p className="text-black text-semibold text-xl">No booking</p>
        </div>
      )}
    </div>
  );
}
