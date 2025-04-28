"use client";

import { useState } from "react";
import StarRating from "./StarRating";
import ReportModal from "./ReportModal";
import { Review } from "../../interface";


interface Props {
  review: Review;
  role?: string;
  onClick?: () => void;
  cancel?: boolean | false;
}

export default function ReviewCard({ review, role, onClick, cancel }: Props) {
  const [showFull, setShowFull] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const handleReportClick = () => {
    setShowReport(!showReport);
  };

  const handleReportSubmit = (reportReason: string) => {
    alert(`Reported with reason: ${reportReason}`);
  };
  const removeReviewHandler = () => {
    alert("delete review eiei");
    // res=await deleteReview(id,session.user.token); ????
  };
  const cancelReportHandler = () => {
    alert("discard report");
    // res=await cancelReport(id,session.user.token); ????
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
        {role === "admin" ? (
          <div className="flex flex-row place-items-around">
            <button
              type="button"
              className="text-xl w-[80px] h-[40px] bg-[#C46B65] text-white font-semibold py-1 px-1 rounded-xl hover:brightness-75 transition-all duration-300 ease-in-out"
              onClick={(e) => {
                e.stopPropagation();
                removeReviewHandler();
              }}
            >
              Remove
            </button>
            {cancel ? (
              <button
                type="button"
                className="ml-5 text-xl w-[80px] h-[40px] bg-[#65C465] text-white font-semibold py-1 px-1 rounded-xl hover:brightness-75 transition-all duration-300 ease-in-out"
                onClick={(e) => {
                  e.stopPropagation();
                  cancelReportHandler();
                }}
              >
                Discard
              </button>
            ) : null}
          </div>
        ) : (
          role === "owner" && (
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
          )
        )}
      </div>

      <div className="flex mt-2 justify-between">
        <div className="ml-4 w-[40%]">
          <p className="text-black text-xl font-semibold">{review.username}</p>
          <p
            className={`text-gray-700 whitespace-pre-wrap transition-all duration-300 break-words  ${
              !showFull ? "line-clamp-[3]" : ""
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

        {review.pictures.length > 0 && (<div className="w-[40%] h-[100px] relative bg-gray-300 rounded-lg overflow-hidden">
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
        </div>)}
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
