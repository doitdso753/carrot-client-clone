import { useCallback, useEffect, useState } from 'react';
import useRegion from '@/hooks/use-region.ts';
import type { MapRegion } from '@/types/map.ts';

type UseMapRegionReturn = {
  appliedRegion: string;
  selectedRegion: string;
  applyRegion: () => void;
  updateRegion: (region: MapRegion) => void;
};

// 지도 중심에서 찾은 행정동 후보와 적용된 전역 지역 관리
export default function useMapRegion(): UseMapRegionReturn {
  const { region: appliedRegion, setRegion } = useRegion();
  const [selectedRegion, setSelectedRegion] = useState(appliedRegion);

  useEffect(() => {
    // 검색 필터 등 외부 지역 변경 시 후보 지역 동기화
    setSelectedRegion(appliedRegion);
  }, [appliedRegion]);

  const updateRegion = useCallback((nextRegion: MapRegion): void => {
    // 지도 드래그 후 조회한 행정동을 적용 전 후보로 저장
    setSelectedRegion(nextRegion.addressName);
  }, []);

  const applyRegion = (): void => {
    // 현재 지도 중심의 행정동을 전체 목록 검색 지역으로 확정
    setRegion(selectedRegion);
  };

  return {
    applyRegion,
    appliedRegion,
    selectedRegion,
    updateRegion,
  };
}
