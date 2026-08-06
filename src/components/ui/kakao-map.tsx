import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { MapMarkerIcon } from '@/assets/icons';
import { loadKakaoMapSdk } from '@/lib/kakao-map';

type KakaoMapProps = {
  address: string;
  level?: number;
};

export default function KakaoMap({
  address,
  level = 3,
}: KakaoMapProps): ReactNode {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapErrorMessage, setMapErrorMessage] = useState('');
  const appKey = import.meta.env.KAKAO_MAP_APP_KEY;

  useEffect(() => {
    const mapContainer = mapContainerRef.current;

    if (!mapContainer) {
      return;
    }

    if (!appKey) {
      setMapErrorMessage('카카오맵 앱 키를 등록해 주세요.');
      return;
    }

    let isActive = true;
    let markerRoot: Root | null = null;
    let markerOverlay: { setMap: (map: null) => void } | null = null;

    void loadKakaoMapSdk(appKey)
      .then((maps) => {
        const geocoder = new maps.services.Geocoder();

        geocoder.addressSearch(address, (result, status) => {
          if (!isActive) {
            return;
          }

          if (status !== maps.services.Status.OK || !result[0]) {
            setMapErrorMessage('주소에 해당하는 위치를 찾지 못했습니다.');
            return;
          }

          const center = new maps.LatLng(
            Number(result[0].y),
            Number(result[0].x),
          );
          const map = new maps.Map(mapContainer, { center, level });
          const markerElement = document.createElement('div');
          markerElement.className = 'kakao-map-marker';
          markerRoot = createRoot(markerElement);
          markerRoot.render(<MapMarkerIcon />);

          markerOverlay = new maps.CustomOverlay({
            map,
            position: center,
            content: markerElement,
            xAnchor: 0.5,
            yAnchor: 1,
          });
        });
      })
      .catch(() => {
        if (isActive) {
          setMapErrorMessage('지도를 불러오지 못했습니다.');
        }
      });

    return () => {
      isActive = false;
      markerOverlay?.setMap(null);
      markerRoot?.unmount();
    };
  }, [address, appKey, level]);

  return (
    <div className="kakao-map-wrapper">
      <div
        className="kakao-map"
        ref={mapContainerRef}
        role="img"
        aria-label={`${address} 지도`}
      />
      {mapErrorMessage && <p className="kakao-map-error">{mapErrorMessage}</p>}
    </div>
  );
}
