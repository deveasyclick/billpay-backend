interface AceIconProps {
  className?: string;
}

export function SparkIcon({ className = "" }: AceIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M2.5 9L9.5 1.5L8 7H13.5L6.5 14.5L8 9H2.5Z"
        stroke="#2563EB"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      />
    </svg>
  );
}
