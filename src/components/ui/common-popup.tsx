import {
  useEffect,
  useRef,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { CloseIcon } from '@/assets/icons';

type CommonPopupProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  variant?: 'dialog' | 'bottom-sheet';
  onClose: () => void;
};

export default function CommonPopup({
  isOpen,
  title,
  children,
  footer,
  variant = 'dialog',
  onClose,
}: CommonPopupProps): ReactNode {
  const popupRef = useRef<HTMLElement>(null);
  const dragStartYRef = useRef(0);
  const dragStartHeightRef = useRef(0);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handlePopupMouseDown = (event: MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
  };

  const handleDragStart = (event: PointerEvent<HTMLDivElement>): void => {
    if (!popupRef.current) {
      return;
    }

    dragStartYRef.current = event.clientY;
    dragStartHeightRef.current =
      popupRef.current.getBoundingClientRect().height;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (
      !popupRef.current ||
      !event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      return;
    }

    const dragDistance = dragStartYRef.current - event.clientY;
    const minimumHeight = 360;
    const maximumHeight = window.innerHeight - 64;
    const nextHeight = Math.min(
      maximumHeight,
      Math.max(minimumHeight, dragStartHeightRef.current + dragDistance),
    );

    popupRef.current.style.height = `${nextHeight}px`;
  };

  const handleDragEnd = (event: PointerEvent<HTMLDivElement>): void => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const isBottomSheet = variant === 'bottom-sheet';

  return (
    <div
      className={`common-popup-backdrop common-popup-backdrop--${variant}`}
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        aria-labelledby="common-popup-title"
        aria-modal="true"
        className={`common-popup common-popup--${variant}`}
        ref={popupRef}
        role="dialog"
        onMouseDown={handlePopupMouseDown}
      >
        {isBottomSheet && (
          <div
            className="common-popup-drag-handle"
            onPointerDown={handleDragStart}
            onPointerMove={handleDragMove}
            onPointerCancel={handleDragEnd}
            onPointerUp={handleDragEnd}
          >
            <span />
          </div>
        )}
        <header className="common-popup-header">
          <h2 className="common-popup-title" id="common-popup-title">
            {title}
          </h2>
          <button
            aria-label="팝업 닫기"
            className="common-popup-close-button"
            type="button"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </header>
        <div className="common-popup-body">{children}</div>
        {footer && <footer className="common-popup-footer">{footer}</footer>}
      </section>
    </div>
  );
}
