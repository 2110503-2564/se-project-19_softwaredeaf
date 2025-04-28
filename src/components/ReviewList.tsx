"use client";

import { useState } from "react";
import { Rating } from "@mui/material";
import StarRating from "./StarRating";
import ReviewModal from "./ReviewModal";
import ReportModal from "./ReportModal";
import ReviewCard from "./ReviewCard";
import { Review } from "../../interface";

interface Props {
  reviews: Review[];
  role?: string;
  cancel?:boolean | false
}

export default function ReviewList({ reviews, role, cancel }: Props) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [fullModal, setFullModal] = useState(false);
  const [isViewReview, setViewReview] = useState(true);
  {
    /*ของ ReviewModal*/
  }
  const [imageIndex, setImageIndex] = useState(0);
  const toggleReviews = () => {
    setViewReview((prev) => !prev);
  };

  if (!reviews) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-600">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mb-3"></div>
        Loading reviews...
      </div>
    );
  }
  
  return (
    <div className="mt-5 mb-5">
      <div className="flex flex-row">
        <p className="text-4xl text-black font-semibold py-5">Reviews</p>
        <h2
          className={`text-xl font-semibold cursor-pointer flex items-center ml-4 mt-1 text-black hover:text-gray-200 transition-transform duration-300 ${
            isViewReview ? "rotate-180" : "rotate-0"
          }`}
          onClick={toggleReviews}
        >
          ▼
        </h2>
      </div>
      <div>
        {isViewReview ? (
          <div className="w-full max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-wrap justify-center gap-4">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <ReviewCard
                    key={review._id}
                    review={review}
                    role={role}
                    onClick={() => {
                      setSelectedReview(review);
                      setFullModal(false);
                      setImageIndex(0);
                    }}
                    cancel={cancel}
                  />
                ))
              ) : (
                <p className="text-black text-xl px-5 py-2">
                  No reviews Available D:
                </p>
              )}
            </div>
          </div>
        ) : null}
      </div>

      {/* Modal */}
      {selectedReview && (
        <ReviewModal
          selectedReview={selectedReview}
          setSelectedReview={setSelectedReview}
        />
      )}
    </div>
  );
}
