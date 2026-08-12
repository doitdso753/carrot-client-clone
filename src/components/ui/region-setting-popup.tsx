import { useState, type ReactNode, type SubmitEvent } from 'react';
import { CurrentLocationIcon, SearchIcon, SpinnerIcon } from '@/assets/icons';
import { BUY_SELL_RECOMMENDED_LOCATIONS } from '@/types/buy-sell-constants.ts';
import CommonPopup from '@/components/ui/common-popup';
import useGeolocation from '@/hooks/location/use-geolocation.ts';
import useRegion from '@/hooks/location/use-region.ts';
import { removeCommaFromString } from '@/lib/utils.ts';
import type { GeolocationErrorCode } from '@/types/geolocation.ts';

const LOCATION_ERROR_MESSAGES: Record<GeolocationErrorCode, string> = {
  GEOLOCATION_UNSUPPORTED: '이 브라우저에서는 위치 정보를 지원하지 않아요.',
  PERMISSION_DENIED: '내 위치 확인을 위해 위치 정보 사용을 허용해 주세요.',
  POSITION_UNAVAILABLE: '현재 위치 정보를 확인할 수 없어요.',
  REQUEST_TIMEOUT: '위치 확인 시간이 초과됐어요. 다시 시도해 주세요.',
  UNKNOWN_ERROR: '지역 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.',
};

type RegionSettingPopupProps = {
  initialLocationErrorCode?: GeolocationErrorCode | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function RegionSettingPopup({
  initialLocationErrorCode = null,
  isOpen,
  onClose,
}: RegionSettingPopupProps): ReactNode {
  const { setRegion } = useRegion();
  const [regionKeyword, setRegionKeyword] = useState('');
  const geolocation = useGeolocation();
  const displayedLocationErrorCode =
    geolocation.status === 'idle'
      ? initialLocationErrorCode
      : geolocation.status === 'error'
        ? geolocation.errorCode
        : null;

  const handleSubmit = (event: SubmitEvent): void => {
    event.preventDefault();

    const nextRegion = removeCommaFromString(regionKeyword).trim();

    if (!nextRegion) {
      return;
    }

    setRegion(nextRegion);
    setRegionKeyword('');
    onClose();
  };

  const handleSelectRegion = (region: string): void => {
    setRegion(removeCommaFromString(region));
    setRegionKeyword('');
    onClose();
  };

  return (
    <CommonPopup isOpen={isOpen} title="지역 변경" onClose={onClose}>
      <form
        className="region-setting-popup-search-form"
        onSubmit={handleSubmit}
      >
        <input
          aria-label="지역 검색"
          className="region-setting-popup-search-input"
          placeholder="지역이나 동네로 검색하기"
          type="search"
          value={regionKeyword}
          onChange={(event) =>
            setRegionKeyword(removeCommaFromString(event.target.value))
          }
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
        disabled={geolocation.isLoading}
        type="button"
        onClick={geolocation.request}
      >
        <span
          className={`current-location-button-content ${
            geolocation.isLoading ? 'is-loading' : ''
          }`}
        >
          <CurrentLocationIcon className="region-setting-popup-current-icon" />
          현재 내 위치 사용하기
        </span>
        {geolocation.isLoading && (
          <span className="current-location-button-spinner">
            <SpinnerIcon />
          </span>
        )}
      </button>
      {geolocation.status === 'granted' && (
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
              <button
                type="button"
                onClick={() => handleSelectRegion(location)}
              >
                {location}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </CommonPopup>
  );
}
