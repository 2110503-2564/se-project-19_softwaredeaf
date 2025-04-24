'use client'
import { useState } from "react";
import StarRating from "./StarRating";
import { Review } from "@/app/mock/mockReviews";

interface Props {
  selectedReview: Review | null;
  setSelectedReview: (review: Review | null) => void;
}

const ReviewModal = ({ selectedReview, setSelectedReview }: Props) => {
  const [fullModal, setFullModal] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  if (!selectedReview) return null;

  return (
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
  );
};

export default ReviewModal;
