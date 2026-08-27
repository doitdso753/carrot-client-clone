import { useCallback, useState } from 'react';
import type { UsePopupReturn } from '@/types/ui.ts';

export default function usePopup(initialIsOpen = false): UsePopupReturn {
  // 팝업이 열려 있는지 한 곳에서 관리합니다.
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  // 버튼이나 링크에서 팝업을 열 때 사용합니다.
  const openPopup = useCallback((): void => {
    setIsOpen(true);
  }, []);

  // 닫기 버튼, 바깥 영역 클릭, ESC 키에서 공통으로 사용합니다.
  const closePopup = useCallback((): void => {
    setIsOpen(false);
  }, []);

  // 같은 버튼으로 열고 닫는 UI가 필요할 때 사용합니다.
  const togglePopup = useCallback((): void => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  }, []);

  return {
    isOpen,
    openPopup,
    closePopup,
    togglePopup,
  };
}
