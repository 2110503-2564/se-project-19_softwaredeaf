"use client";
import { Rating, TextField } from "@mui/material";
import BookedAmenityList from "@/components/BookedAmenityList";
import dayjs from "dayjs";
import deleteBooking from "@/libs/deleteBooking";
import deleteAmenityBookingByBookingId from "@/libs/deleteAmenityBookingByBookingId";
import { ReservationItem } from "../../interface";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RatingandReview({
  booking,
  token,
}: {
  booking: ReservationItem;
  token: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState<string>("");

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
    <div className="flex flex-col px-10 py-5 w-[80%] h-auto bg-white text-black font-bold border border-[#A4B465] rounded-[40px]  mx-auto my-20 shadow-lg">
      <div className="flex flex-row">
        <div className="w-[50%]">
          <div className="w-[100%] flex justify-start gap-5">
            <div className="w-[60%]">
              <p className="mt-7 mb-3">Campground:</p>
              <div className="bg-[#D9D9D9] px-3 py-1 mt-2 rounded-md text-base font-light w-[74%] flex place-content-evenly">
                {booking.camp.name}
              </div>
            </div>
            <button
              className="w-[100px] h-[50px] bg-[#C46B65] flex items-center justify-center shadow-md hover:brightness-70 mt-10"
              onClick={() => {
                // You can implement submit review logic here later
                alert("Review submitted!");
              }}
            >
              Complete Review
            </button>
          </div>
          <div className="w-full mt-10">
            <p className="mb-5">Date:</p>
            <div className="flex place-content-stretch">
              <div className="flex overflow-y-auto mr-5 w-[45%]">
                <p className="mr-2">From:</p>
                <div className="bg-[#D9D9D9] px-3 py-1 rounded-md text-base font-light w-full flex place-content-evenly">
                  {" "}
                  {dayjs(booking.startDate).format("DD/MM/YYYY").toString()}
                </div>
              </div>
              <div className="flex overflow-y-auto w-[45%]">
                <p className="mr-2">To:</p>
                <div className="bg-[#D9D9D9] px-3 py-1 rounded-md text-base font-light w-full flex place-content-evenly">
                  {" "}
                  {dayjs(booking.endDate).format("DD/MM/YYYY").toString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[50%]">
          <BookedAmenityList token={token} bid={booking._id} />
        </div>
      </div>

      <div className="h-auto border border-yellow-300 rounded-xl mt-5 p-5 flex flex-col">
        <Rating
          name="campgroundrating"
          defaultValue={0}
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          precision={0.5}
        />
        <div className="mt-5 flex flex-row">
          <TextField
            className="w-[75%]"
            id="ratingcomment"
            label="Write your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
            rows={4}
          />

          <div className="ml-10 w-[25%] h-auto border border-black rounded-xl">
            <p>Add picture up to 3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
