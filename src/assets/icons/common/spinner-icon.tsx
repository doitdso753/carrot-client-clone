import type { ReactNode } from 'react';

export function SpinnerIcon(): ReactNode {
  return (
    <svg
      className="spinner-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="progressbar"
      aria-label="현재 위치 확인 중"
    >
      <circle
        className="spinner-icon-track"
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <circle
        className="spinner-icon-range"
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}
