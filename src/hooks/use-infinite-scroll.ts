import { useEffect, useRef, type RefObject } from 'react';

type UseInfiniteScrollParams = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onIntersect: () => void;
  resetKey?: number | string;
};

type UseInfiniteScrollReturn = {
  observerTargetRef: RefObject<HTMLDivElement | null>;
};

export default function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  onIntersect,
  resetKey,
}: UseInfiniteScrollParams): UseInfiniteScrollReturn {
  // 감지 대상
  const observerTargetRef = useRef<HTMLDivElement>(null);

  // 다음 페이지 감지
  useEffect(() => {
    // 중복 요청 방지
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    // 감지 대상 참조
    const observerTarget = observerTargetRef.current;

    if (!observerTarget) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 교차 상태 확인
        if (!entry?.isIntersecting) {
          return;
        }

        // 다음 페이지 요청
        onIntersect();
      },
      { rootMargin: '120px' },
    );

    observer.observe(observerTarget);

    return () => {
      // 감지 해제
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, onIntersect, resetKey]);

  return {
    observerTargetRef,
  };
}
