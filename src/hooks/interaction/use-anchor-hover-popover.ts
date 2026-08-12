import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react';

type UseAnchorHoverPopoverReturn<T extends HTMLElement> = {
  anchorRef: RefObject<T | null>;
  isPopoverOpen: boolean;
  popoverRef: RefObject<HTMLDivElement | null>;
  popoverStyle: CSSProperties;
  openPopover: () => void;
  closePopover: () => void;
};

export default function useAnchorHoverPopover<
  T extends HTMLElement,
>(): UseAnchorHoverPopoverReturn<T> {
  // 팝오버 위치 계산 기준 요소
  const anchorRef = useRef<T>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  // 마우스 이탈 후 닫기 예약
  const closeTimerRef = useRef<number | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [popoverStyle, setPopoverStyle] = useState<CSSProperties>({});

  useLayoutEffect(() => {
    if (!isPopoverOpen) {
      return;
    }

    const viewportMargin = 16;
    const popoverGap = 8;
    const updatePosition = (): void => {
      const anchorRect = anchorRef.current?.getBoundingClientRect();
      const popoverElement = popoverRef.current;

      if (!anchorRect || !popoverElement) {
        return;
      }

      const top = anchorRect.bottom + popoverGap;
      const left = Math.min(
        Math.max(anchorRect.left, viewportMargin),
        window.innerWidth - popoverElement.offsetWidth - viewportMargin,
      );

      setPopoverStyle({
        left: Math.max(viewportMargin, left),
        maxHeight: Math.max(0, window.innerHeight - top - viewportMargin),
        maxWidth: window.innerWidth - viewportMargin * 2,
        top,
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);

    return () => window.removeEventListener('resize', updatePosition);
  }, [isPopoverOpen]);

  const openPopover = (): void => {
    // 닫힘이 예약되어 있었다면 취소하고 다시 열림 상태를 유지합니다.
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    if (!anchorRef.current) {
      return;
    }

    setIsPopoverOpen(true);
  };

  const closePopover = (): void => {
    // 팝오버 이동 시간을 고려한 닫기 지연
    closeTimerRef.current = window.setTimeout(() => {
      setIsPopoverOpen(false);
      closeTimerRef.current = null;
    }, 120);
  };

  return {
    anchorRef,
    isPopoverOpen,
    popoverRef,
    popoverStyle,
    openPopover,
    closePopover,
  };
}
