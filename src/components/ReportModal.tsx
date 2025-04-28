import { useState } from "react";

interface ReportModalProps {
  role?: string;
  onReport: (reportReason: string) => void;
  onClose: () => void;
}

const ReportModal = ({ role, onReport, onClose }: ReportModalProps) => {
  const [selectedReason, setSelectedReason] = useState<string | undefined>("");
  const [otherReason, setOtherReason] = useState<string>("");

  const handleReportClick = () => {
    if (selectedReason === "Other" && !otherReason) {
      alert("Please provide a reason for 'Other'.");
    } else if (selectedReason) {
      onReport(selectedReason === "Other" ? otherReason : selectedReason);
      onClose(); // Close modal after reporting
    } else {
      alert("Please select a reason.");
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent closing modal on inner click
    onClose(); // Close the ReportModal when clicking the overlay (background)
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleOverlayClick} // Close modal when clicking on overlay
    >
      <div
        className="bg-white rounded-xl p-6 max-w-xl w-full relative shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing ReportModal when clicking inside modal
      >
        <button
          className="absolute top-2 right-3 text-xl font-bold text-gray-700 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="mb-4">
          <p className="text-xl font-semibold text-black">Reporting Reason</p>
          <select
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="w-full p-2 rounded bg-white text-black border border-black mt-2"
          >
            <option value="">Select Reason</option>
            <option value="inappropriate">Inappropriate Content</option>
            <option value="spam">Spam</option>
            <option value="fake">Fake Infomation</option>
            <option value="offensive Language">Offensive Language</option>
            <option value="other">Other</option>
          </select>

          {/* Conditional Input for 'Other' */}
          {selectedReason === "Other" && (
            <div className="mt-4">
              <label htmlFor="other-reason" className="block text-sm text-black">
                Please provide a reason:
              </label>
              <textarea
                id="other-reason"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded text-black"
                rows={4}
                placeholder="Enter custom reason here"
              />
            </div>
          )}
        </div>

        <button
          onClick={handleReportClick}
          className="w-full bg-[#C46B65] text-white font-semibold py-2 rounded-xl hover:bg-[#830900]"
        >
          Submit Report
        </button>
      </div>
    </div>
  );
};

export default ReportModal;
