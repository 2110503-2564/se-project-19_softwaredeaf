"use client";

import { useState } from "react";
import { Rating } from "@mui/material";
import { Review } from "@/app/mock/mockReviews";
import StarRating from "./StarRating";
import ReviewModal from "./ReviewModal";
import ReportModal from "./ReportModal";
import ReviewCard from "./ReviewCard";

interface Props {
  reviews: Review[];
  role?: string;
}

export default function ReviewList({ reviews, role }: Props) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [fullModal, setFullModal] = useState(false);
  {
    /*ของ ReviewModal*/
  }
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
        <ReviewModal
          selectedReview={selectedReview}
          setSelectedReview={setSelectedReview}
        />
      )}
    </>
  );
}

