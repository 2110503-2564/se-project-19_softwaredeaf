"use client";
import { Rating, TextField } from "@mui/material";
import BookedAmenityList from "@/components/BookedAmenityList";
import dayjs from "dayjs";
import deleteBooking from "@/libs/deleteBooking";
import deleteAmenityBookingByBookingId from "@/libs/deleteAmenityBookingByBookingId";
import { ReservationItem } from "../../interface";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RatingAndReview({
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
      alert("Delete Booking Success!");
      router.push("/mybooking");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReviewSubmit = () => {
    if (!rating || !comment.trim()) {
      alert("Please provide both a rating and a comment.");
      return;
    }
    // Submit logic goes here (API call)
    console.log("Review Submitted:", { rating, comment });
    alert("Review submitted!");
  };

  return (
    <div className="flex flex-col px-10 py-5 w-[90%] bg-white text-black font-bold border border-[#A4B465] rounded-[40px] mx-auto my-20 shadow-lg">
      {/* Header Section */}
      <div className="flex flex-row">
        <div className="w-[20%] bg-neutral-200 rounded-xl">
          
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
              {/* Review button */}

                <button
                  className="mt-5 px-3 w-[50%] h-[35px] bg-yellow-400 rounded-xl shadow-md hover:bg-yellow-700 transition"
                  onClick={handleReviewSubmit}
                >
                    Review Campground
                </button>

          </div>

          {/* Date Section */}
          <div className="mt-10">
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

      {/* Review & Rating Section */}
      <div className="relative border border-yellow-300 rounded-xl mt-10 p-5">
        <div className="flex flex-row ">
          <Rating
            name="campground-rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            precision={0.5}
          />
          <button
            onClick={handleReviewSubmit}
            className="flex absolute right-5 px-4 py-1 bg-yellow-300 rounded-lg text-black text-lg font-semibold hover:bg-yellow-400 transition"
          >
            Submit Review
          </button>
        </div>

        <div className="mt-5 flex gap-5">
          <TextField
            fullWidth
            className="bg-neutral-200 rounded-md"
            id="rating-comment"
            label="Write your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
            rows={4}
          />
          <div className="w-[25%] h-auto border border-neutral-400 rounded-md text-neutral-500 bg-neutral-200 flex flex-col items-center justify-center hover:border-black cursor-pointer">
            <p className="text-sm">Add Picture (Up to 3)</p>
            <p className="text-5xl mt-2">+</p>
          </div>
        </div>
      </div>
    </div>
  );
}