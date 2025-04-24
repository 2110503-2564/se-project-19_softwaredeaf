"use client";

import { useState } from "react";
import { Rating } from "@mui/material";
import { Review } from "@/app/mock/mockReviews";
import StarRating from "./StarRating";
import ReviewModal from "./ReviewModal";
import ReportModal from "./ReportModal";

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
  const [showReport, setShowReport] = useState(false);
  const handleReportClick = () => {
    setShowReport(!showReport);
  };

  const handleReportSubmit = (reportReason: string) => {
    alert(`Reported with reason: ${reportReason}`);
    // คุณสามารถเพิ่มฟังก์ชันเพิ่มเติม เช่น ส่งข้อมูลไปยัง server หรือเก็บสถานะการรายงาน
  };

  const handleConfirmReportClick = () => {
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
          {review.images.length > 1 && (
            <div className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-sm px-2 py-0.5 rounded-md">
              +{review.images.length - 1}
            </div>
          )}
        </div>
      </div>

      {showReport && (
        <ReportModal
          role={role}
          onReport={handleReportSubmit}
          onClose={handleReportClick}
        />
      )}
    </div>
  );
}
