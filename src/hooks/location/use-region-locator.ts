import { useEffect } from 'react';
import useGeolocation from '@/hooks/location/use-geolocation.ts';
import usePopup from '@/hooks/ui/use-popup.ts';
import type { GeolocationState } from '@/types/geolocation.ts';

type UseRegionLocatorReturn = {
  geolocation: GeolocationState;
  regionPopup: {
    close: () => void;
    isOpen: boolean;
    open: () => void;
  };
};

// 브라우저 현재 위치 요청과 실패 시 지역 선택 팝업 제어
export default function useRegionLocator(): UseRegionLocatorReturn {
  const geolocation = useGeolocation();
  const regionPopup = usePopup();

  useEffect(() => {
    // 위치 권한 거부·조회 실패 시 직접 선택할 지역 팝업 노출
    if (geolocation.status === 'error' && geolocation.errorCode) {
      regionPopup.openPopup();
    }
  }, [geolocation.errorCode, geolocation.status, regionPopup.openPopup]);

  return {
    geolocation,
    regionPopup: {
      close: regionPopup.closePopup,
      isOpen: regionPopup.isOpen,
      open: regionPopup.openPopup,
    },
  };
}
