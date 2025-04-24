"use client";

import { useState } from "react";
import { Rating } from "@mui/material";
import { Review } from "@/app/mock/mockReviews";
import StarRating from "./StarRating";

interface Props {
  reviews: Review[];
  role?: string;
}

export default function ReviewList({ reviews, role }: Props) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [fullModal, setFullModal] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center gap-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                role={role}
                onClick={() => {
                  setSelectedReview(review);
                  setFullModal(false);
                  setImageIndex(0);
                }}
              />
            ))
          ) : (
            <p className="text-black text-xl px-5 py-2">
              No reviews Available D:
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedReview && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-xl w-full relative shadow-lg max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-3 text-xl font-bold text-gray-700 hover:text-black"
              onClick={() => setSelectedReview(null)}
            >
              ✕
            </button>

            <div className="mb-4">
              <StarRating rating={selectedReview.rating} maxRating={5} />
              <h2 className="text-2xl font-bold mt-2 text-black">
                {selectedReview.name}
              </h2>
            </div>

            {/* Comment */}
            <p
              className={`text-gray-800 whitespace-pre-wrap ${
                !fullModal ? "line-clamp-[7]" : ""
              }`}
            >
              {selectedReview.comment}
            </p>
            {selectedReview.comment.length > 300 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFullModal(!fullModal);
                }}
                className="text-blue-500 hover:underline text-sm mt-1"
              >
                {fullModal ? "Show less" : "Read more"}
              </button>
            )}

            {/* Images */}
            <div className="mt-4 relative">
              {selectedReview.images.length > 0 && (
                <>
                  <img
                    src={selectedReview.images[imageIndex]}
                    alt={`review image ${imageIndex + 1}`}
                    className="rounded-md object-cover h-auto w-full"
                  />
                  {selectedReview.images.length > 1 && (
                    <>
                      <button
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full text-black border border-black"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageIndex(
                            (prev) =>
                              (prev - 1 + selectedReview.images.length) %
                              selectedReview.images.length
                          );
                        }}
                      >
                        ◀
                      </button>
                      <button
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full text-black border border-black"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageIndex(
                            (prev) => (prev + 1) % selectedReview.images.length
                          );
                        }}
                      >
                        ▶
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ReviewCard({
  review,
  role,
  onClick,
}: {
  review: Review;
  role?: string;
  onClick?: () => void;
}) {
  const [showFull, setShowFull] = useState(false);

  const handleReportClick = () => {
    const confirmed = window.confirm(
      "Are you sure you want to report this review?"
    );
    if (confirmed) {
      alert("Reported successfully! ปลอม");
    } else {
      alert("Cancelled.");
    }
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer w-full md:w-[calc(50%-1rem)] bg-white border border-black rounded-lg p-4 py-6 shadow-sm hover:shadow-lg transition"
    >
      <div className="flex justify-between items-center">
        <div className="ml-3">
        <StarRating rating={review.rating} maxRating={5} />
        </div>
        <button
          type="button"
          className="text-xl w-[80px] h-[40px] bg-[#C46B65] text-white font-semibold py-1 px-1 rounded-xl hover:bg-[#830900]"
          onClick={(e) => {
            e.stopPropagation();
            handleReportClick();
          }}
        >
          Report
        </button>
      </div>

      <div className="flex mt-2 justify-between">
        <div className="ml-4 w-[40%]">
          <p className="text-black text-xl font-semibold">{review.name}</p>
          <p
            className={`text-gray-700 whitespace-pre-wrap transition-all duration-300 ${
              !showFull ? "line-clamp-[7]" : ""
            }`}
          >
            {review.comment}
          </p>
          {review.comment.length > 300 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowFull(!showFull);
              }}
              className="text-blue-500 hover:underline text-sm mt-1"
            >
              {showFull ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        <div className="w-[40%] h-[100px] relative bg-gray-300 rounded-lg overflow-hidden">
          <img
            src={review.images[0]}
            alt="review image"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
