import type { ReactNode } from 'react';
import {
  CurrentLocationIcon,
  SearchIcon,
  SpinnerIcon,
} from '@/assets/icons';
import { BUY_SELL_RECOMMENDED_LOCATIONS } from '@/types/buy-sell-constants.ts';
import CommonPopup from '@/components/ui/common-popup';
import useCurrentLocationRequest, {
  type CurrentLocationErrorCode,
} from '@/hooks/use-current-location-request.ts';

const LOCATION_ERROR_MESSAGES: Record<CurrentLocationErrorCode, string> = {
  GEOLOCATION_UNSUPPORTED: '이 브라우저에서는 위치 정보를 지원하지 않아요.',
  PERMISSION_DENIED: '내 위치 확인을 위해 위치 정보 사용을 허용해 주세요.',
  POSITION_UNAVAILABLE: '현재 위치 정보를 확인할 수 없어요.',
  REQUEST_TIMEOUT: '위치 확인 시간이 초과됐어요. 다시 시도해 주세요.',
  UNKNOWN_ERROR: '지역 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.',
};

type RegionSettingPopupProps = {
  initialLocationErrorCode?: CurrentLocationErrorCode | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function RegionSettingPopup({
  initialLocationErrorCode = null,
  isOpen,
  onClose,
}: RegionSettingPopupProps): ReactNode {
  const {
    locationErrorCode,
    locationRequestStatus,
    requestCurrentLocation,
  } = useCurrentLocationRequest();
  const displayedLocationErrorCode =
    locationRequestStatus === 'idle'
      ? initialLocationErrorCode
      : locationRequestStatus === 'error'
        ? locationErrorCode
        : null;

  return (
    <CommonPopup isOpen={isOpen} title="지역 변경" onClose={onClose}>
      <form className="region-setting-popup-search-form">
        <input
          aria-label="지역 검색"
          className="region-setting-popup-search-input"
          placeholder="지역이나 동네로 검색하기"
          type="search"
        />
        <button
          aria-label="지역 검색"
          className="region-setting-popup-search-button"
          type="submit"
        >
          <SearchIcon />
        </button>
      </form>
      <button
        className="region-setting-popup-current-button"
        disabled={locationRequestStatus === 'requesting'}
        type="button"
        onClick={requestCurrentLocation}
      >
        <span
          className={`current-location-button-content ${
            locationRequestStatus === 'requesting' ? 'is-loading' : ''
          }`}
        >
          <CurrentLocationIcon className="region-setting-popup-current-icon" />
          현재 내 위치 사용하기
        </span>
        {locationRequestStatus === 'requesting' && (
          <span className="current-location-button-spinner">
            <SpinnerIcon />
          </span>
        )}
      </button>
      {locationRequestStatus === 'granted' && (
        <p className="region-setting-popup-location-status" role="status">
          위치 설정이 켜졌습니다.
        </p>
      )}
      {displayedLocationErrorCode && (
        <p className="region-setting-popup-location-status" role="alert">
          {LOCATION_ERROR_MESSAGES[displayedLocationErrorCode]}
        </p>
      )}
      <section className="region-setting-popup-recommend">
        <h3 className="region-setting-popup-recommend-title">추천</h3>
        <ul className="region-setting-popup-recommend-list">
          {BUY_SELL_RECOMMENDED_LOCATIONS.map((location) => (
            <li className="region-setting-popup-recommend-item" key={location}>
              <button type="button">{location}</button>
            </li>
          ))}
        </ul>
      </section>
    </CommonPopup>
  );
}
