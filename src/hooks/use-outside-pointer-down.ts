import { useEffect, useRef, type RefObject } from 'react';

export default function useOutsidePointerDown<T extends HTMLElement>({
  isEnabled,
  onOutsidePointerDown,
}: {
  isEnabled: boolean;
  onOutsidePointerDown: () => void;
}): RefObject<T | null> {
  // 기준이 되는 영역입니다. 이 영역 밖을 누르면 닫기 동작을 실행합니다.
  const targetRef = useRef<T>(null);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const handlePointerDown = (event: PointerEvent): void => {
      const targetElement = targetRef.current;

      // 메뉴나 팝오버 안쪽을 누른 경우에는 그대로 두고, 바깥을 누른 경우에만 닫습니다.
      if (targetElement && !targetElement.contains(event.target as Node)) {
        onOutsidePointerDown();
      }
    };

    // 화면 어디를 눌렀는지 문서 전체에서 감지합니다.
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isEnabled, onOutsidePointerDown]);

  return targetRef;
}
