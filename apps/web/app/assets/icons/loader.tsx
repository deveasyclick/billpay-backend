interface AceIconProps {
  className?: string;
}

export function LoaderTree({ className = "" }: AceIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      className={className}
    >
      <path d="M8 2.10303V4.76969" stroke="#E84142" strokeWidth="1.4" />
      <path d="M8 12.7695V15.4362" stroke="#E84142" strokeWidth="1.4" />
      <path d="M14.6667 8.76953H12" stroke="#E84142" strokeWidth="1.4" />
      <path d="M3.99992 8.76953H1.33325" stroke="#E84142" strokeWidth="1.4" />
      <path
        d="M12.7135 4.05615L10.8279 5.94177"
        stroke="#E84142"
        strokeWidth="1.4"
      />
      <path
        d="M5.17199 11.5977L3.28638 13.4833"
        stroke="#E84142"
        strokeWidth="1.4"
      />
      <path
        d="M12.7137 13.4833L10.8281 11.5977"
        stroke="#E84142"
        strokeWidth="1.4"
      />
      <path
        d="M5.17199 5.94177L3.28638 4.05615"
        stroke="#E84142"
        strokeWidth="1.4"
      />
    </svg>
  );
}
