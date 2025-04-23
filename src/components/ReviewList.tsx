"use client";

import { useState } from "react";
import { Rating } from "@mui/material";
import { Review } from "@/app/mock/mockReviews"; // อย่าลืมเปลี่ยน path ตามโปรเจกต์ของคุณ

interface Props {
  reviews: Review[];
  role?: string;
}

export default function ReviewList({ reviews, role }: Props) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [fullModal,setFullModal] = useState(false);
  
  
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
                onClick={() => setSelectedReview(review)}
              />
            ))
          ) : (
            <p className="text-black text-xl px-5 py-2">No reviews Available D:</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedReview && (
  <div
    className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
    onClick={() => setSelectedReview(null)} // คลิกนอก -> ปิด
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
        <Rating value={selectedReview.rating} readOnly />
        <h2 className="text-2xl font-bold mt-2 text-black">{selectedReview.name}</h2>
      </div>

      {/* Review Comment Section */}
      <p
        className={`text-gray-800 whitespace-pre-wrap ${!fullModal ? "line-clamp-[7]" : ""}`}
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

      {/* Review Image */}
      <div className="mt-4">
        <img
          src="/img/campicdemo.jpg"
          alt="review"
          className="rounded-md object-cover h-auto w-full"
        />
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
    const confirmed = window.confirm("Are you sure you want to report this review?");
    if (confirmed) {
      // ดำเนินการ report ได้เลย
      alert("Reported successfully! ปลอม");
    } else {
      // ผู้ใช้กดยกเลิก
      alert("Cancelled.");
    }
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer w-full md:w-[calc(50%-1rem)] bg-white border border-gray-300 rounded-lg p-4 py-6 shadow-sm hover:shadow-lg transition"
    >
      <div className="flex justify-between items-center">
        <Rating value={review.rating} readOnly className="ml-3" />
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

      <div className="flex mt-4 justify-between">
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
            src="/img/campicdemo.jpg"
            alt="review image"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
