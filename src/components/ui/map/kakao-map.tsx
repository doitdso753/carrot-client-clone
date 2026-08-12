import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { MapMarkerIcon } from '@/assets/icons';
import { loadKakaoMapSdk, type KakaoRegionCodeResult } from '@/lib/kakao-map';
import type {
  MapBoundsChangeEvent,
  MapBoundsChangeSource,
  MapRegion,
} from '@/types/map.ts';

type KakaoMapProps = {
  address: string;
  isMarkerVisible?: boolean;
  level?: number;
  onBoundsChange?: (event: MapBoundsChangeEvent) => void;
  onRegionChange?: (region: MapRegion) => void;
};

export default function KakaoMap({
  address,
  isMarkerVisible = true,
  level = 3,
  onBoundsChange,
  onRegionChange,
}: KakaoMapProps): ReactNode {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapErrorMessage, setMapErrorMessage] = useState('');
  const appKey = import.meta.env.KAKAO_MAP_APP_KEY;

  // 주소를 좌표로 변환한 뒤 지도 인스턴스와 선택 기능 초기화
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
    let removeDragEndListener: (() => void) | null = null;
    let markerRoot: Root | null = null;
    let markerOverlay: { setMap: (map: null) => void } | null = null;

    void loadKakaoMapSdk(appKey)
      .then((maps) => {
        const geocoder = new maps.services.Geocoder();

        // 전달받은 주소를 최초 지도 중심 좌표로 변환
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

          // 현재 화면의 남서·북동 경계를 외부 목록 검색에 전달
          const notifyBoundsChange = (source: MapBoundsChangeSource): void => {
            if (!onBoundsChange) {
              return;
            }

            const bounds = map.getBounds();
            const northEast = bounds.getNorthEast();
            const southWest = bounds.getSouthWest();

            onBoundsChange({
              bounds: {
                northEast: {
                  latitude: northEast.getLat(),
                  longitude: northEast.getLng(),
                },
                southWest: {
                  latitude: southWest.getLat(),
                  longitude: southWest.getLng(),
                },
              },
              source,
            });
          };

          // 드래그 종료 후 지도 범위와 중심 행정동 갱신
          const handleDragEnd = (): void => {
            notifyBoundsChange('drag');

            if (!onRegionChange) {
              return;
            }

            const nextCenter = map.getCenter();
            const latitude = nextCenter.getLat();
            const longitude = nextCenter.getLng();

            geocoder.coord2RegionCode(
              longitude,
              latitude,
              (regions, regionStatus) => {
                if (!isActive || regionStatus !== maps.services.Status.OK) {
                  return;
                }

                // 행정동 코드만 선택하고 법정동 코드는 제외
                const region = regions.find(
                  (region: KakaoRegionCodeResult) => region.region_type === 'H',
                );

                if (!region) {
                  return;
                }

                onRegionChange({
                  addressName: region.address_name,
                  code: region.code,
                  latitude,
                  longitude,
                  region1DepthName: region.region_1depth_name,
                  region2DepthName: region.region_2depth_name,
                  region3DepthName: region.region_3depth_name,
                  region4DepthName: region.region_4depth_name,
                });
              },
            );
          };

          // 콜백이 있을 때만 지도 이동 감지 이벤트 등록
          if (onBoundsChange || onRegionChange) {
            maps.event.addListener(map, 'dragend', handleDragEnd);
            removeDragEndListener = () => {
              maps.event.removeListener(map, 'dragend', handleDragEnd);
            };
          }

          if (onBoundsChange) {
            notifyBoundsChange('initial');
          }

          // 상세 지도 등 마커가 필요한 화면에서만 오버레이 생성
          if (isMarkerVisible) {
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
          }
        });
      })
      .catch(() => {
        if (isActive) {
          setMapErrorMessage('지도를 불러오지 못했습니다.');
        }
      });

    return () => {
      // 비동기 콜백 차단과 지도 이벤트·React 오버레이 정리
      isActive = false;
      removeDragEndListener?.();
      markerOverlay?.setMap(null);
      markerRoot?.unmount();
    };
  }, [address, appKey, isMarkerVisible, level, onBoundsChange, onRegionChange]);

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
