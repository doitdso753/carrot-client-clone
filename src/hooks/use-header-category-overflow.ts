import { useEffect, useRef, useState } from 'react';
import type { HeaderCategoryOverflowState } from '@/types/header-category.ts';

export default function useHeaderCategoryOverflow(): HeaderCategoryOverflowState {
  // 카테고리 목록 영역입니다. 실제 너비와 보이는 너비를 비교할 때 사용합니다.
  const navRef = useRef<HTMLElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isScrollEnd, setIsScrollEnd] = useState(false);

  useEffect(() => {
    const navElement = navRef.current;

    if (!navElement) {
      return;
    }

    const updateOverflow = (): void => {
      // 전체 목록 너비가 화면에 보이는 너비보다 크면 가로 스크롤이 필요한 상태입니다.
      const nextHasOverflow =
        navElement.scrollWidth > navElement.clientWidth + 1;
      // 사용자가 오른쪽 끝까지 스크롤했는지 확인해 더보기 버튼 상태를 정합니다.
      const nextIsScrollEnd =
        navElement.scrollLeft + navElement.clientWidth >=
        navElement.scrollWidth - 1;

      setHasOverflow(nextHasOverflow);
      setIsScrollEnd(nextHasOverflow ? nextIsScrollEnd : false);
    };

    updateOverflow();

    // 화면 크기나 목록 크기가 바뀌면 스크롤 필요 여부도 다시 계산합니다.
    const resizeObserver = new ResizeObserver(updateOverflow);
    resizeObserver.observe(navElement);
    navElement.addEventListener('scroll', updateOverflow);
    window.addEventListener('resize', updateOverflow);

    return () => {
      resizeObserver.disconnect();
      navElement.removeEventListener('scroll', updateOverflow);
      window.removeEventListener('resize', updateOverflow);
    };
  }, []);

  return {
    navRef,
    hasOverflow,
    isScrollEnd,
  };
}
