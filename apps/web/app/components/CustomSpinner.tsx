import { cn } from "@/lib/utils";
import type { FormEvent } from "react";

interface CustomSpinnerProps {
  onClickUp: (v: number) => void;
  onClickDown: () => void;
  className?: string;
}

export default function CustomSpinner({
  onClickUp,
  onClickDown,
  className,
}: CustomSpinnerProps) {
  return (
    <div className={cn("flex flex-col", className ? className : "")}>
      <button
        type="button"
        onChange={(e) => onClickUp(parseFloat(e.currentTarget.value) || 0)}
        className="px-2 text-gray-500 hover:text-black cursor-pointer"
      >
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          className="w-3 h-3"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M903.232 768l56.768-50.432L512 256l-448 461.568 56.768 50.432L512 364.928z"
              fill="#000000"
            ></path>
          </g>
        </svg>
      </button>
      <button
        type="button"
        onClick={onClickDown}
        className="px-2 text-gray-500 hover:text-black cursor-pointer"
      >
        <span>
          <svg
            viewBox="0 0 1024 1024"
            className="w-3 h-3"
            version="1.1"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z"
                fill="#000000"
                data-darkreader-inline-fill=""
              ></path>
            </g>
          </svg>
        </span>
      </button>
    </div>
  );
}
