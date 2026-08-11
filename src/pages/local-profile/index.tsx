import type { ReactNode } from 'react';
import MapMenu from '@/components/ui/map/map-menu.tsx';
import RootLayout from '@/layouts/root-layout.tsx';
import HeaderWithSearch from '@/layouts/header-with-search/header-with-search.tsx';
import LocalProfileContent from '@/pages/local-profile/local-profile-content.tsx';
import KakaoMap from '@/components/ui/map/kakao-map.tsx';
import useRegion from '@/hooks/use-region.ts';

export default function LocalProfilePage(): ReactNode {
  const { region } = useRegion();

  return (
    <RootLayout>
      <div className="map-page">
        <div className="map-background" aria-hidden="true">
          <KakaoMap
            address={region}
            isMarkerVisible={false}
            level={4}
          />
        </div>
        <MapMenu />
      </div>
    </RootLayout>
  );
}
