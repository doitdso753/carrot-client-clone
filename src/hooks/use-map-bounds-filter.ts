import { useCallback, useState } from 'react';
import type {
  MapBounds,
  MapBoundsChangeEvent,
  MapCoordinate,
} from '@/types/map.ts';

type MapBoundsItem = MapCoordinate;

type UseMapBoundsFilterReturn<TItem> = {
  filteredItems: TItem[];
  filterByBounds: () => void;
  updateBounds: (event: MapBoundsChangeEvent) => void;
};

function isItemWithinBounds(item: MapBoundsItem, bounds: MapBounds): boolean {
  // 항목 좌표가 남서·북동 경계로 만든 사각 범위에 포함되는지 판별
  return (
    item.latitude >= bounds.southWest.latitude &&
    item.latitude <= bounds.northEast.latitude &&
    item.longitude >= bounds.southWest.longitude &&
    item.longitude <= bounds.northEast.longitude
  );
}

// 현재 지도 경계와 범위 안에 노출할 항목 관리
export default function useMapBoundsFilter<TItem extends MapBoundsItem>(
  items: TItem[],
): UseMapBoundsFilterReturn<TItem> {
  const [bounds, setBounds] = useState<MapBounds | null>(null);
  const [filteredItems, setFilteredItems] = useState<TItem[]>([]);

  const updateBounds = useCallback(
    ({ bounds: nextBounds, source }: MapBoundsChangeEvent): void => {
      // 지도 생성 또는 드래그 종료 시 최신 화면 경계 저장
      setBounds(nextBounds);

      if (source === 'initial') {
        // 현재 region으로 생성된 최초 지도 범위의 목록만 노출
        setFilteredItems(
          items.filter((item) => isItemWithinBounds(item, nextBounds)),
        );
      }
    },
    [items],
  );

  const filterByBounds = (): void => {
    if (!bounds) {
      return;
    }

    // 사용자 검색 요청 시점의 경계를 기준으로 목록 갱신
    setFilteredItems(items.filter((item) => isItemWithinBounds(item, bounds)));
  };

  return {
    filterByBounds,
    filteredItems,
    updateBounds,
  };
}
