"use client";
import { Rating, TextField } from "@mui/material";
import BookedAmenityList from "@/components/BookedAmenityList";
import dayjs from "dayjs";
import deleteBooking from "@/libs/deleteBooking";
import deleteAmenityBookingByBookingId from "@/libs/deleteAmenityBookingByBookingId";
import { ReservationItem } from "../../interface";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useRef } from "react";

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
  const [reviewPictures, setReviewPictures] = useState<File[]>();
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  const handleChangFileArray = (fileInput:FileList) => {
    const arrayFile = Array.from(fileInput);
    setReviewPictures(arrayFile);
  }

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
        <div className="w-[20%] bg-neutral-200 rounded-xl overflow-hidden relative">
          <Image
            alt="campground"
            src={booking.camp.picture}
            height={1080}
            width={1920}
            className="w-full h-full object-cover rounded-xl"
          />

          <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-60 rounded-xl" />

          <Image
              alt="Overlay"
              src="/img/visitedStamp.png"
              height={500}
              width={500}
              className="absolute top-1/2 left-1/2 w-[70%] h-[70%] object-contain pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
            />
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
          <label
            htmlFor="reviewImageInput"
            className="w-[25%] h-auto border border-neutral-400 rounded-md text-neutral-500 bg-neutral-200 flex flex-col items-center justify-center hover:border-black cursor-pointer"
          >
            {
              reviewPictures ? (
                <div className="flex flex-col items-center justify-center cursor-pointer">
                  {reviewPictures.map((picture, index) => (
                    <p key={index} className="text-sm">{picture.name}</p>
                  ))}
                  <button
                    onClick={(e) => {
                      setReviewPictures(undefined);
                      e.preventDefault()
                      if (inputRef.current) {
                        inputRef.current.value = "";
                      }
                    }}
                    className="mt-2"
                  >
                    <img
                      src="/img/cancel.png"
                      alt="clear"
                      className="ml-3 w-3 h-3"
                    />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center cursor-pointer">
                  <p className="text-sm">Add Picture (Up to 3)</p>
                  <p className="text-5xl mt-2">+</p>
                </div>
              )
            }

          </label>
          <input
            ref={inputRef}
            id="reviewImageInput"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 3) {
                alert("กรุณาเลือกไม่เกิน 3 รูปภาพ");
                e.target.value = "";
              } else if(files && !reviewPictures) {
                alert("เพิ่มรูปภาพแล้ว");
                handleChangFileArray(files);
              }else if(files){
                alert("เปลี่ยนรูปภาพแล้ว");
                handleChangFileArray(files);
              }
            }}
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
}
