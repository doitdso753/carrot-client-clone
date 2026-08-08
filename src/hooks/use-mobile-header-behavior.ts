import { useCallback, useEffect, useRef, useState } from 'react';

const MOBILE_MEDIA_QUERY = '(max-width: 767px)';
const SCROLL_DIRECTION_THRESHOLD = 8;
const HEADER_HIDE_DELAY = 200;

type UseMobileHeaderBehaviorReturn = {
  isHeaderVisible: boolean;
  isMobileSearchOpen: boolean;
  handleMobileNavOpenChange: (isOpen: boolean) => void;
  handleToggleSearch: () => void;
};

export default function useMobileHeaderBehavior(): UseMobileHeaderBehaviorReturn {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const headerHideTimerRef = useRef<number | null>(null);
  const isMobileSearchOpenRef = useRef(false);
  const previousScrollYRef = useRef(0);
  const searchCloseTimerRef = useRef<number | null>(null);

  // 검색 패널과 헤더에 예약된 닫힘 작업 취소
  const clearScheduledHide = useCallback((): void => {
    if (searchCloseTimerRef.current) {
      window.clearTimeout(searchCloseTimerRef.current);
      searchCloseTimerRef.current = null;
    }
    if (headerHideTimerRef.current) {
      window.clearTimeout(headerHideTimerRef.current);
      headerHideTimerRef.current = null;
    }
  }, []);

  const handleMobileNavOpenChange = (isOpen: boolean): void => {
    setIsMobileNavOpen(isOpen);
  };

  // 검색 패널을 직접 토글할 때 헤더 노출 유지
  const handleToggleSearch = (): void => {
    clearScheduledHide();
    setIsHeaderVisible(true);
    setIsMobileSearchOpen((currentValue) => {
      const nextValue = !currentValue;
      isMobileSearchOpenRef.current = nextValue;
      return nextValue;
    });
  };

  // 모바일 화면의 스크롤 방향에 따른 검색 패널과 헤더 노출 제어
  useEffect(() => {
    const mobileMediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);

    const handleScroll = (): void => {
      const currentScrollY = Math.max(window.scrollY, 0);

      // 데스크톱 또는 모바일 메뉴 활성 상태에서는 헤더 고정
      if (!mobileMediaQuery.matches || isMobileNavOpen) {
        clearScheduledHide();
        setIsHeaderVisible(true);
        previousScrollYRef.current = currentScrollY;
        return;
      }

      const scrollDifference = currentScrollY - previousScrollYRef.current;

      // 페이지 최상단에서는 예약 작업을 취소하고 헤더 복원
      if (currentScrollY === 0) {
        clearScheduledHide();
        setIsHeaderVisible(true);
        previousScrollYRef.current = currentScrollY;
      } else if (Math.abs(scrollDifference) >= SCROLL_DIRECTION_THRESHOLD) {
        const isScrollingDown = scrollDifference > 0;

        if (isScrollingDown) {
          // 첫 번째 아래 스크롤에서 검색 패널 우선 닫기
          if (isMobileSearchOpenRef.current) {
            if (!searchCloseTimerRef.current) {
              searchCloseTimerRef.current = window.setTimeout(() => {
                isMobileSearchOpenRef.current = false;
                setIsMobileSearchOpen(false);
                searchCloseTimerRef.current = null;
              }, HEADER_HIDE_DELAY);
            }
          } else if (!headerHideTimerRef.current) {
            // 검색 패널이 닫힌 뒤 다음 아래 스크롤에서 헤더 닫기
            headerHideTimerRef.current = window.setTimeout(() => {
              setIsHeaderVisible(false);
              headerHideTimerRef.current = null;
            }, HEADER_HIDE_DELAY);
          }
        } else {
          // 위 스크롤에서 예약 작업을 취소하고 헤더 복원
          clearScheduledHide();
          setIsHeaderVisible(true);
        }
        previousScrollYRef.current = currentScrollY;
      }
    };

    // 반응형 구간 변경 시 기본 노출 상태로 초기화
    const handleViewportChange = (): void => {
      clearScheduledHide();
      setIsHeaderVisible(true);
      previousScrollYRef.current = Math.max(window.scrollY, 0);
    };

    previousScrollYRef.current = Math.max(window.scrollY, 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    mobileMediaQuery.addEventListener('change', handleViewportChange);

    return () => {
      clearScheduledHide();
      window.removeEventListener('scroll', handleScroll);
      mobileMediaQuery.removeEventListener('change', handleViewportChange);
    };
  }, [clearScheduledHide, isMobileNavOpen]);

  return {
    isHeaderVisible,
    isMobileSearchOpen,
    handleMobileNavOpenChange,
    handleToggleSearch,
  };
}
