"use client";

import { useState } from "react";
import { Review } from "@/app/mock/mockReviews";
import { Rating } from "@mui/material";

interface Props {
  reviews: Review[];
}

export default function ReviewList({ reviews }: Props) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-wrap justify-center gap-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <p className="text-black text-xl px-5 py-2">No reviews Available D:</p>
        )}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [showFull, setShowFull] = useState(false);

  return (
    <div className="w-full md:w-[calc(50%-1rem)] bg-white border border-gray-300 rounded-lg p-4 py-6 shadow-sm">
      {/* Rating & Button */}
      <div className="flex justify-between items-center">
        <Rating
          name={`user-rating-${review.id}`}
          value={review.rating}
          size="large"
          readOnly
          className="ml-3"
        />
        <button
          type="button"
          className="text-xl w-[80px] h-[40px] bg-[#C46B65] text-white font-semibold py-1 px-1 rounded-xl hover:bg-[#830900]"
        >
          Report
        </button>
      </div>

      {/* Content */}
      <div className="flex mt-4 justify-between">
        {/* Text Content */}
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
              onClick={() => setShowFull(!showFull)}
              className="text-blue-500 hover:underline text-sm mt-1"
            >
              {showFull ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Image */}
        <div className="w-[40%] h-[100px] relative bg-gray-300 rounded-lg overflow-hidden">
          <img
            src="/img/campicdemo.jpg"
            alt="review image"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
