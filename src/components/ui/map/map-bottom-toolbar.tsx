import type { ReactNode } from 'react';
import { CurrentLocationIcon, RefreshIcon, SpinnerIcon } from '@/assets/icons';
import RegionSettingPopup from '@/components/ui/region-setting-popup.tsx';
import useRegionLocator from '@/hooks/location/use-region-locator.ts';

type MapBottomToolbarProps = {
  region: string;
  onRegionRefresh: () => void;
};

// 현재 지도 범위 검색과 사용자 현재 위치 탐색을 제공하는 하단 툴바
export default function MapBottomToolbar({
  region,
  onRegionRefresh,
}: MapBottomToolbarProps): ReactNode {
  const { geolocation, regionPopup } = useRegionLocator();

  return (
    <>
      <div className="map-bottom-toolbar">
        <button
          className="common-item-trigger map-region-refresh-button"
          type="button"
          onClick={onRegionRefresh}
        >
          <RefreshIcon />
          <span>{region}으로 설정</span>
        </button>
        <button
          aria-label="현재 위치에서 주변 검색"
          className="common-item-trigger map-current-location-button"
          disabled={geolocation.isLoading}
          type="button"
          onClick={geolocation.request}
        >
          {geolocation.isLoading ? <SpinnerIcon /> : <CurrentLocationIcon />}
        </button>
      </div>
      <RegionSettingPopup
        initialLocationErrorCode={geolocation.errorCode}
        isOpen={regionPopup.isOpen}
        key={`${geolocation.status}-${geolocation.errorCode ?? 'none'}`}
        onClose={regionPopup.close}
      />
    </>
  );
}
