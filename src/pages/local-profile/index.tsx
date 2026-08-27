import type { ReactNode } from 'react';
import MapBottomToolbar from '@/components/ui/map/map-bottom-toolbar.tsx';
import MapMenu from '@/components/ui/map/map-menu.tsx';
import RootLayout from '@/layouts/root-layout.tsx';
import HeaderWithSearch from '@/layouts/header-with-search/header-with-search.tsx';
import LocalProfileContent from '@/pages/local-profile/local-profile-content.tsx';
import KakaoMap from '@/components/ui/map/kakao-map.tsx';
import useMapBoundsFilter from '@/hooks/map/use-map-bounds-filter.ts';
import useMapRegion from '@/hooks/map/use-map-region.ts';
import { LOCAL_PROFILE_ITEMS } from '@/types/local-profile';

export default function LocalProfilePage(): ReactNode {
  const { appliedRegion, applyRegion, selectedRegion, updateRegion } =
    useMapRegion();
  const { filterByBounds, filteredItems, updateBounds } =
    useMapBoundsFilter(LOCAL_PROFILE_ITEMS);

  // 지도에서 선택한 행정동을 적용하고 현재 화면 범위의 업체 목록 검색
  const handleSearchCurrentMap = (): void => {
    applyRegion();
    filterByBounds();
  };

  return (
    <RootLayout>
      <div className="map-page">
        <div className="map-background" aria-hidden="true">
          <KakaoMap
            address={appliedRegion}
            isMarkerVisible={false}
            level={4}
            onBoundsChange={updateBounds}
            onRegionChange={updateRegion}
          />
        </div>
        <div className="local-profile-list-panel">
          <HeaderWithSearch activeCategoryCode="localProfile" />
          <LocalProfileContent items={filteredItems} />
        </div>
        <MapBottomToolbar
          region={selectedRegion}
          onRegionRefresh={handleSearchCurrentMap}
        />
        <MapMenu />
      </div>
    </RootLayout>
  );
}
