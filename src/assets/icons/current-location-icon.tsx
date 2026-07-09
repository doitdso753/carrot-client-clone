import type { ReactNode } from 'react';

type CurrentLocationIconProps = {
  className?: string;
};

export function CurrentLocationIcon({
  className,
}: CurrentLocationIconProps): ReactNode {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      aria-hidden="true"
    >
      <g>
        <g>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.28112 10.8H4.99999C5.66273 10.8 6.19999 11.3372 6.19999 12C6.19999 12.6627 5.66273 13.2 4.99999 13.2H3.28112C3.8129 17.1 6.89993 20.1871 10.8 20.7189V19C10.8 18.3372 11.3372 17.8 12 17.8C12.6627 17.8 13.2 18.3372 13.2 19V20.7189C17.1 20.1871 20.1871 17.1 20.7189 13.2H19C18.3372 13.2 17.8 12.6627 17.8 12C17.8 11.3372 18.3372 10.8 19 10.8H20.7189C20.1871 6.89993 17.1 3.8129 13.2 3.28112V4.99999C13.2 5.66273 12.6627 6.19999 12 6.19999C11.3372 6.19999 10.8 5.66273 10.8 4.99999V3.28112C6.89993 3.8129 3.8129 6.89993 3.28112 10.8ZM0.799988 12C0.799988 5.8144 5.8144 0.799988 12 0.799988C18.1856 0.799988 23.2 5.8144 23.2 12C23.2 18.1856 18.1856 23.2 12 23.2C5.8144 23.2 0.799988 18.1856 0.799988 12Z"
            fill="currentColor"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.99999 12C9.99999 10.8954 10.8954 9.99999 12 9.99999C13.1046 9.99999 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 9.99999 13.1046 9.99999 12Z"
            fill="currentColor"
          ></path>
        </g>
      </g>
    </svg>
  );
}
