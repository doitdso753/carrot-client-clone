import { useEffect, useRef, type RefObject } from 'react';

export default function useOutsidePointerDown<T extends HTMLElement>({
  ignoredSelector,
  isEnabled,
  onOutsidePointerDown,
}: {
  ignoredSelector?: string;
  isEnabled: boolean;
  onOutsidePointerDown: () => void;
}): RefObject<T | null> {
  // 외부 클릭 판단 기준 영역
  const targetRef = useRef<T>(null);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const handlePointerDown = (event: PointerEvent): void => {
      const targetElement = targetRef.current;
      const eventTarget = event.target;

      if (
        ignoredSelector &&
        eventTarget instanceof Element &&
        eventTarget.closest(ignoredSelector)
      ) {
        return;
      }

      // 기준 영역 외부 클릭 시 닫기
      if (targetElement && !targetElement.contains(eventTarget as Node)) {
        onOutsidePointerDown();
      }
    };

    // 문서 전체 포인터 이벤트 감지
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [ignoredSelector, isEnabled, onOutsidePointerDown]);

  return targetRef;
}
