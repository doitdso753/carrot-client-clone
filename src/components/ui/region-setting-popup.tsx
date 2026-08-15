import { useState, type ReactNode, type SubmitEvent } from 'react';
import { CurrentLocationIcon, SearchIcon, SpinnerIcon } from '@/assets/icons';
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

const NEARBY_REGIONS = [
  '경기도 화성시 만세구 우정읍',
  '경기도 화성시 만세구 남양읍',
  '경기도 화성시 만세구 마도면',
  '경기도 화성시 만세구 송산면',
  '경기도 화성시 만세구 서신면',
  '경기도 화성시 만세구 팔탄면',
  '경기도 화성시 만세구 장안면',
  '경기도 화성시 만세구 양감면',
  '경기도 화성시 만세구 새솔동',
] as const;

const RECOMMENDED_REGIONS = [
  '인천광역시 연수구 송도동',
  '서울특별시 강남구 역삼동',
  '경상남도 양산시 물금읍',
  '경기도 화성시 효행구 봉담읍',
  '충청남도 아산시 배방읍',
  '서울특별시 서초구 서초동',
  '경기도 양주시 옥정동',
  '서울특별시 관악구 신림동',
  '충청남도 천안시 서북구 불당동',
  '경기도 화성시 만세구 향남읍',
  '서울특별시 강남구 청담동',
  '경기도 남양주시 다산동',
  '경기도 남양주시 별내동',
  '경기도 남양주시 화도읍',
  '대구광역시 달성군 다사읍',
  '서울특별시 강서구 마곡동',
  '서울특별시 강남구 압구정동',
  '경기도 시흥시 배곧동',
] as const;

const SEARCHABLE_REGIONS = [...NEARBY_REGIONS, ...RECOMMENDED_REGIONS];

type RegionChipItem = {
  label: string;
  value: string;
};

type RegionChipSectionProps = {
  items: readonly RegionChipItem[];
  title: string;
  onSelect: (region: string) => void;
};

function RegionChipSection({
  items,
  title,
  onSelect,
}: RegionChipSectionProps): ReactNode {
  return (
    <section className="region-setting-popup-region-section">
      <h3 className="region-setting-popup-region-title">{title}</h3>
      <div className="region-setting-popup-region-chip-wrapper">
        {items.map((item) => (
          <button
            className="region-setting-popup-region-chip"
            key={item.value}
            type="button"
            onClick={() => onSelect(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}

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
  const [searchedKeyword, setSearchedKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<string[] | null>(null);
  const nearbyRegionItems: RegionChipItem[] = NEARBY_REGIONS.map((region) => ({
    label: region.split(' ').pop() ?? region,
    value: region,
  }));
  const recommendedRegionItems: RegionChipItem[] = RECOMMENDED_REGIONS.map(
    (region) => ({ label: region, value: region }),
  );
  const geolocation = useGeolocation();
  const displayedLocationErrorCode =
    geolocation.status === 'idle'
      ? initialLocationErrorCode
      : geolocation.status === 'error'
        ? geolocation.errorCode
        : null;
  const hasNoSearchResults = searchResults?.length === 0;

  const handleSubmit = (event: SubmitEvent): void => {
    event.preventDefault();

    const keyword = removeCommaFromString(regionKeyword).trim();

    if (!keyword) {
      setSearchedKeyword('');
      setSearchResults(null);
      return;
    }

    const normalizedKeyword = keyword.replace(/\s/g, '');
    setSearchedKeyword(keyword);
    setSearchResults(
      SEARCHABLE_REGIONS.filter((region) =>
        region.replace(/\s/g, '').includes(normalizedKeyword),
      ),
    );
  };

  const handleSelectRegion = (region: string): void => {
    setRegion(removeCommaFromString(region));
    setRegionKeyword('');
    setSearchedKeyword('');
    setSearchResults(null);
    onClose();
  };

  return (
    <CommonPopup isOpen={isOpen} title="지역 변경" onClose={onClose}>
      <div className="region-setting-popup">
        <div className="region-setting-popup-control-wrapper">
          <div className="region-setting-popup-search">
            <h3 className="region-setting-popup-search-title">지역 이름</h3>
            <form
              className="region-setting-popup-search-form"
              onSubmit={handleSubmit}
            >
              <input
                aria-label="지역 검색"
                className="region-setting-popup-search-input"
                placeholder="서울특별시, 서초구, 서초4동"
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
          </div>
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
        </div>
        <div className="region-setting-popup-scroll-area">
          {!hasNoSearchResults && geolocation.status === 'granted' && (
            <p className="region-setting-popup-location-status" role="status">
              위치 설정이 켜졌습니다.
            </p>
          )}
          {!hasNoSearchResults && displayedLocationErrorCode && (
            <p className="region-setting-popup-location-status" role="alert">
              {LOCATION_ERROR_MESSAGES[displayedLocationErrorCode]}
            </p>
          )}
          {searchResults === null ? (
            <div className="region-setting-popup-region-wrapper">
              <RegionChipSection
                items={nearbyRegionItems}
                title="주변 지역"
                onSelect={handleSelectRegion}
              />
              <RegionChipSection
                items={recommendedRegionItems}
                title="추천 지역"
                onSelect={handleSelectRegion}
              />
            </div>
          ) : (
            <section className="region-setting-popup-search-result-wrapper">
              {searchResults.length > 0 ? (
                <>
                  <h3 className="region-setting-popup-search-result-title">
                    검색 결과
                  </h3>
                  <ul className="region-setting-popup-search-result-list">
                    {searchResults.map((region) => (
                      <li
                        className="region-setting-popup-search-result-item"
                        key={region}
                      >
                        <button
                          type="button"
                          onClick={() => handleSelectRegion(region)}
                        >
                          {region}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div
                  className="region-setting-popup-search-empty"
                  role="status"
                >
                  <p className="region-setting-popup-search-empty-title">
                    <strong>{searchedKeyword}</strong>에 대한 검색 결과가
                    없어요.
                  </p>
                  <p className="region-setting-popup-search-empty-description">
                    <strong>서울특별시, 서초구</strong>와 같이 더 넓은 범위의
                    키워드로 검색하시거나, <strong>서초동</strong>과 같은 읍면동
                    이름으로 검색해보세요.
                  </p>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </CommonPopup>
  );
}
