"use client";
import { Rating, TextField } from "@mui/material";
import BookedAmenityList from "@/components/BookedAmenityList";
import dayjs from "dayjs";
import { ReservationItem, Review, ReviewData } from "../../interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRef } from "react";
import createReview from "@/libs/createReview";
import getBookingReview from "@/libs/getBookingReview";
import deleteReview from "@/libs/deleteReview";
import editReview from "@/libs/editReview";


export default function RatingAndReview({
  booking,
  token,
  role
}: {
  booking: ReservationItem;
  token: string;
  role: string
}) {
  const router = useRouter();
  const [showReviewSection, setShowReviewSection] = useState(false);
  const [isEditReview, setEditReview] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState<string>("");
  const [reviewPictures, setReviewPictures] = useState<Record<string, File[]>>({});
  const [review, setReview] = useState<Review | null>(null);

  const getReview = async () => {
    try {
      const response: ReviewData = await getBookingReview(token, booking._id);
      setReview(response.data[0]);
      if (response.data[0]) {
        setShowReviewSection(true)
        setComment(response.data[0].comment)
        setRating(response.data[0].rating)
      }
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getReview();
    // console.log(review);
  }, []);

  const handleDelete = async (rid: string) => {
    setIsDeleting(true);
    try {
      await deleteReview(token, rid);
      alert("Delete Review Success!");
      setReview(null);
      setShowReviewSection(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    } finally {
      setIsDeleting(false);
    }
  };
  
  const handleEditSubmit = async () => {
    if (!rating || !comment.trim()) {
      alert("Please provide both a rating and a comment.");
      return;
    }
    if (!review) {
      alert("No review to update!");
      return;
    }
  
    const newData = new FormData();
    newData.append('rating', rating.toString());
    newData.append('comment', comment);
    if (reviewPictures[booking._id] && reviewPictures[booking._id].length > 0) {
      reviewPictures[booking._id].forEach(file => {
        newData.append('images', file);
      });
    }
  
    try {
      await editReview(token, review._id, newData);
      alert('Review updated successfully!');
      setEditReview(false); // Exit edit mode
      getReview(); // Refresh review
    } catch (error) {
      console.error(error);
      alert('Failed to update review!');
    }
  };
  

  const handleChangFileArray = (fileInput: FileList, bookingId: string) => {
    const arrayFile = Array.from(fileInput);
    setReviewPictures((prev) => ({
      ...prev,
      [bookingId]: arrayFile,
    }));
  };

  const handleReviewSubmit = async () => {
    if (!rating || !comment.trim()) {
      alert("Please provide both a rating and a comment.");
      return;
    }
    const newData = new FormData;
    newData.append('rating', rating.toString());
    newData.append('comment', comment);
    newData.append('campgroundId', booking.camp._id);
    newData.append('campgroundName', booking.camp.name);
    newData.append('bookingId', booking._id)
    if (reviewPictures[booking._id] && reviewPictures[booking._id].length > 0) {
      reviewPictures[booking._id].forEach(file => {
        newData.append('images', file);
      });
    }

    try {
      await createReview(token, newData);
      // Submit logic goes here (API call)
      console.log("Review Submitted:", { rating, comment });
      // router.refresh();
      alert("Review submitted!");
    } catch (error) {
      console.log(error);
      alert('Create Review Failed!')
    }
  };

  return (
    <div className="flex flex-col w-[90%] bg-white text-black font-bold border border-[#A4B465] rounded-[40px] mx-auto my-20 shadow-lg">
      {/* Header Section */}
      <div className="flex flex-row">
        <div className={`w-[20%] h-[250px] bg-neutral-200 ${showReviewSection ? 'rounded-tl-[40px]' : 'rounded-l-[40px]'} overflow-hidden relative`}>
          <Image
            alt="campground"
            src={booking.camp.picture}
            height={1080}
            width={1920}
            className={`w-full h-full object-cover ${showReviewSection ? 'rounded-tl-[40px]' : 'rounded-l-[40px]'}`}
          />

          <div className={`absolute top-0 left-0 w-full h-full bg-white bg-opacity-60 ${showReviewSection ? 'rounded-tl-[40px]' : 'rounded-l-[40px]'}`} />

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
            {
              role == 'user' ?
                <div className="w-[50%] flex items-center justify-center">
                  {
                    review ?
                      <div>
                        <button
                          className={`mt-10 ml-3 px-3 w-[200px] h-[35px] bg-yellow-400 rounded-md shadow-md hover:bg-yellow-700 transition`}
                          onClick={() => setEditReview(!isEditReview)}
                        >
                          Edit Review
                        </button>
                      </div>
                      :
                      <div>
                        <button
                          className={`mt-10 ml-3 px-3 w-[200px] h-[35px] ${showReviewSection ? "bg-yellow-700" : "bg-yellow-400"} rounded-md shadow-md hover:bg-yellow-700 transition`}
                          onClick={() => setShowReviewSection(!showReviewSection)}
                        >
                          Review
                        </button>
                      </div>
                  }

                </div>
                : null
            }
          </div>

          {/* Date Section */}
          <div className="mt-5">
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
        <div className="w-[35%]">
          <BookedAmenityList token={token} bid={booking._id} rt={showReviewSection} />
        </div>
      </div>

      {/* Review & Rating Section */}
      {showReviewSection && (
        <div className="relative border border-yellow-300 rounded-xl m-10 p-5">
          {
            review ?
              <div>
                {
                  isEditReview ?
                    <div>
                      <div className="flex flex-row ">
                        <Rating
                          name="campground-rating"
                          value={rating}
                          onChange={(event, newValue) => setRating(newValue)}
                          precision={0.5}
                        />
                        <button
                          onClick={handleEditSubmit}
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
                          htmlFor={`reviewImageInput-${booking._id}`}
                          key={review._id}
                          className="w-[25%] h-auto border border-neutral-400 rounded-md text-neutral-500 bg-neutral-200 flex flex-col items-center justify-center hover:border-black cursor-pointer"
                        >
                          {
                            reviewPictures[booking._id] ? (
                              <div className="flex flex-col items-center justify-center cursor-pointer">
                                {reviewPictures[booking._id].map((picture, index) => (
                                  <p key={index} className="text-sm">{picture.name}</p>
                                ))}
                                <button
                                  onClick={(e) => {
                                    setReviewPictures(prev => ({
                                      ...prev,
                                      [booking._id]: []
                                    }));
                                    e.preventDefault()
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
                          id={`reviewImageInput-${booking._id}`}
                          key={booking._id}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files && files.length > 3) {
                              alert("กรุณาเลือกไม่เกิน 3 รูปภาพ");
                              e.target.value = "";
                            } else if (files && !reviewPictures[booking._id]) {
                              alert("เพิ่มรูปภาพแล้ว");
                              handleChangFileArray(files,booking._id);
                            } else if (files) {
                              alert("เปลี่ยนรูปภาพแล้ว");
                              handleChangFileArray(files,booking._id);
                            }
                          }}
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>
                    :
                    <div>
                      <div className="flex flex-row items-center">
                        <Rating
                          name="campground-rating"
                          value={review.rating}
                          precision={0.5}
                          readOnly
                        />

                        <button
                          className={`ml-auto mr-5 px-3 w-[150px] h-[35px] bg-red-400 rounded-md shadow-md hover:bg-red-700 transition`}
                          onClick={() => handleDelete(review._id)}
                        >
                          DELETE
                        </button>
                      </div>
                      <div className="mt-5 flex gap-5">
                        <TextField
                          fullWidth
                          className="bg-neutral-200 rounded-md"
                          id="rating-comment"
                          label="Comment"
                          value={review.comment}
                          multiline
                          rows={4}
                          InputProps={{ readOnly: true }}
                        />
                        <label
                          className="w-[25%] h-auto border border-neutral-400 rounded-md text-neutral-500 bg-neutral-200 flex flex-col items-center justify-center hover:border-black cursor-pointer"
                        >
                          {
                            review.pictures.length > 0 && review.pictures ? (
                              <div className="flex flex-col items-center justify-center cursor-pointer">
                                <div className="w-[100%] h-[100px] relative bg-gray-300 rounded-lg overflow-hidden">
                                  <img
                                    src={review.pictures[0]}
                                    alt="review image"
                                    className="object-cover w-full h-full"
                                  />
                                  {review.pictures.length > 1 && (
                                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-sm px-2 py-0.5 rounded-md">
                                      +{review.pictures.length - 1}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center cursor-pointer">

                              </div>
                            )
                          }

                        </label>
                        <input
                          id={`reviewImageInput-${booking._id}`}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files && files.length > 3) {
                              alert("กรุณาเลือกไม่เกิน 3 รูปภาพ");
                              e.target.value = "";
                            } else if (files && !reviewPictures[booking._id]) {
                              alert("เพิ่มรูปภาพแล้ว");
                              handleChangFileArray(files,booking._id);
                            } else if (files) {
                              alert("เปลี่ยนรูปภาพแล้ว");
                              handleChangFileArray(files,booking._id);
                            }
                          }}
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>
                }
              </div>
              :
              <div>
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
                    htmlFor={`reviewImageInput-${booking._id}`}
                    className="w-[25%] h-auto border border-neutral-400 rounded-md text-neutral-500 bg-neutral-200 flex flex-col items-center justify-center hover:border-black cursor-pointer"
                  >
                    {
                      reviewPictures[booking._id] ? (
                        <div className="flex flex-col items-center justify-center cursor-pointer">
                          {reviewPictures[booking._id].map((picture, index) => (
                            <p key={index} className="text-sm">{picture.name}</p>
                          ))}
                          <button
                            onClick={(e) => {
                              setReviewPictures(prev => ({
                                ...prev,
                                [booking._id]: []
                              }));
                              e.preventDefault()
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
                    id={`reviewImageInput-${booking._id}`}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 3) {
                        alert("กรุณาเลือกไม่เกิน 3 รูปภาพ");
                        e.target.value = "";
                      } else if (files && !reviewPictures[booking._id]) {
                        alert("เพิ่มรูปภาพแล้ว");
                        handleChangFileArray(files,booking._id);
                      } else if (files) {
                        alert("เปลี่ยนรูปภาพแล้ว");
                        handleChangFileArray(files,booking._id);
                      }
                    }}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
          }
        </div>
      )}
    </div>
  );
}
