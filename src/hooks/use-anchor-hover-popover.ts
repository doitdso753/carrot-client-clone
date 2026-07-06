import { useRef, useState, type CSSProperties, type RefObject } from 'react';

type UseAnchorHoverPopoverReturn<T extends HTMLElement> = {
  anchorRef: RefObject<T | null>;
  isPopoverOpen: boolean;
  popoverStyle: CSSProperties;
  openPopover: () => void;
  closePopover: () => void;
};

export default function useAnchorHoverPopover<
  T extends HTMLElement,
>(): UseAnchorHoverPopoverReturn<T> {
  // 팝오버가 붙을 기준 버튼입니다. 이 버튼 위치를 기준으로 팝오버 위치를 계산합니다.
  const anchorRef = useRef<T>(null);
  // 마우스가 잠깐 벗어나도 바로 닫히지 않도록 닫기 예약을 저장합니다.
  const closeTimerRef = useRef<number | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [popoverStyle, setPopoverStyle] = useState<CSSProperties>({});

  const openPopover = (): void => {
    // 닫힘이 예약되어 있었다면 취소하고 다시 열림 상태를 유지합니다.
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    const anchorElement = anchorRef.current;

    if (!anchorElement) {
      return;
    }

    const anchorRect = anchorElement.getBoundingClientRect();

    // 기준 버튼 바로 아래, 같은 왼쪽 위치에 팝오버가 뜨도록 좌표를 맞춥니다.
    setPopoverStyle({
      top: anchorRect.bottom + 8,
      left: anchorRect.left,
    });
    setIsPopoverOpen(true);
  };

  const closePopover = (): void => {
    // 팝오버로 마우스를 옮기는 동안 닫히지 않도록 아주 짧게 기다렸다가 닫습니다.
    closeTimerRef.current = window.setTimeout(() => {
      setIsPopoverOpen(false);
      closeTimerRef.current = null;
    }, 120);
  };

  return {
    anchorRef,
    isPopoverOpen,
    popoverStyle,
    openPopover,
    closePopover,
  };
}
