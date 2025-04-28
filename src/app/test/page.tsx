import { useState } from "react";

export default function ReviewText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <p className={expanded ? "" : "line-clamp-3"}>
        {text}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-600 mt-1 underline"
      >
        {expanded ? "less" : "more"}
      </button>
    </div>
  );
}
