import { useEffect, type RefObject } from 'react';
import useOutsidePointerDown from '@/hooks/interaction/use-outside-pointer-down.ts';
import usePopup from '@/hooks/ui/use-popup.ts';

type UseTooltipReturn<T extends HTMLElement> = {
  isOpen: boolean;
  tooltipRef: RefObject<T | null>;
  closeTooltip: () => void;
  toggleTooltip: () => void;
};

export default function useTooltip<
  T extends HTMLElement,
>(): UseTooltipReturn<T> {
  const {
    isOpen,
    closePopup: closeTooltip,
    togglePopup: toggleTooltip,
  } = usePopup();

  const tooltipRef = useOutsidePointerDown<T>({
    isEnabled: isOpen,
    onOutsidePointerDown: closeTooltip,
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        closeTooltip();
      }
    };

    // 키보드 사용자가 ESC로 툴팁을 닫을 수 있게 합니다.
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeTooltip, isOpen]);

  return {
    isOpen,
    tooltipRef,
    closeTooltip,
    toggleTooltip,
  };
}
