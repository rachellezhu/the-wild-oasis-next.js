import { useState } from "react";

export default function TextExpander({ children }: { children: string }) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <span>
      {displayText}&nbsp;
      <button className="text-primary-700 border-b border-primary-700 leading-3 pb-1">
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </span>
  );
}
