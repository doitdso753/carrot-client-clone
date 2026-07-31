import type { ReactNode } from 'react';
import { ChevronDownFillIcon, LocationIcon, SpinnerIcon } from '@/assets/icons';

type FindRegionProps = {
  isLoading: boolean;
  region: string;
  onCurrentLocationRequest: () => void;
  onRegionOpen: () => void;
};

export default function FindRegion({
  isLoading,
  region,
  onCurrentLocationRequest,
  onRegionOpen,
}: FindRegionProps): ReactNode {
  return (
    <div className="find-region">
      <button
        className="common-select-button"
        type="button"
        onClick={onRegionOpen}
      >
        <span className="truncate">{region}</span>
        <ChevronDownFillIcon />
      </button>
      <button
        className="common-primary-button"
        disabled={isLoading}
        type="button"
        onClick={onCurrentLocationRequest}
      >
        <span
          className={`current-location-button-content ${
            isLoading ? 'is-loading' : ''
          }`}
        >
          <LocationIcon className="h-5 w-5" />현 위치로 설정
        </span>
        {isLoading && (
          <span className="current-location-button-spinner">
            <SpinnerIcon />
          </span>
        )}
      </button>
    </div>
  );
}
