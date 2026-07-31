import type { ReactNode } from 'react';
import {
  ChevronDownFillIcon,
  LocationIcon,
  SpinnerIcon,
} from '@/assets/icons';

type SearchFilterRegionProps = {
  isCurrentLocationLoading: boolean;
  region: string;
  onCurrentLocationRequest: () => void;
  onRegionOpen: () => void;
};

export default function SearchFilterRegion({
  isCurrentLocationLoading,
  region,
  onCurrentLocationRequest,
  onRegionOpen,
}: SearchFilterRegionProps): ReactNode {
  return (
    <div className="search-filter-region-actions">
      <button
        className="common-primary-button"
        disabled={isCurrentLocationLoading}
        type="button"
        onClick={onCurrentLocationRequest}
      >
        <span
          className={`current-location-button-content ${
            isCurrentLocationLoading ? 'is-loading' : ''
          }`}
        >
          <LocationIcon className="h-5 w-5" />현 위치로 설정
        </span>
        {isCurrentLocationLoading && (
          <span className="current-location-button-spinner">
            <SpinnerIcon />
          </span>
        )}
      </button>
      <button
        className="common-select-button"
        type="button"
        onClick={onRegionOpen}
      >
        <span className="truncate">{region}</span>
        <ChevronDownFillIcon />
      </button>
    </div>
  );
}
