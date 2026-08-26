import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import SearchFilterFields from '@/components/ui/search-filter/search-filter-fields.tsx';
import type {
  SearchFilterConfig,
  SearchFilterSectionKey,
  SearchFilterViewModel,
} from '@/types/search-filter';

// 검색 필터 툴바 팝업 구성 정보
type SearchFilterToolbarPopoverProps = {
  anchorRect: DOMRect | null;
  hasFooter?: boolean;
  model: SearchFilterViewModel;
  sectionKeys: SearchFilterSectionKey[];
  width?: number | 'max-content';
  onApply?: () => void;
  onReset?: () => void;
};

export default function SearchFilterToolbarPopover({
  anchorRect,
  hasFooter = false,
  model,
  sectionKeys,
  width = 240,
  onApply,
  onReset,
}: SearchFilterToolbarPopoverProps): ReactNode {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);
  const config: SearchFilterConfig = {
    ...model.config,
    sections: model.config.sections.filter((section) =>
      sectionKeys.includes(section.key),
    ),
  };
  const popoverLabel = config.sections
    .map((section) => section.label)
    .join(', ');

  useLayoutEffect(() => {
    if (!anchorRect) {
      return;
    }

    const viewportMargin = 16;
    const updatePosition = (): void => {
      const popoverWidth = popoverRef.current?.offsetWidth ?? 0;
      const nextLeft = Math.min(
        Math.max(anchorRect.left, viewportMargin),
        window.innerWidth - popoverWidth - viewportMargin,
      );

      setLeft(Math.max(viewportMargin, nextLeft));
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);

    return () => window.removeEventListener('resize', updatePosition);
  }, [anchorRect, width]);

  if (!anchorRect) {
    return null;
  }

  const viewportMargin = 16;
  const popoverGap = 8;
  const top = anchorRect.bottom + popoverGap;
  const availableWidth = window.innerWidth - viewportMargin * 2;
  const popoverStyle: CSSProperties = {
    left,
    maxHeight: Math.max(0, window.innerHeight - top - viewportMargin),
    maxWidth: availableWidth,
    top,
    width: typeof width === 'number' ? Math.min(width, availableWidth) : width,
  };

  return createPortal(
    <div
      aria-label={`${popoverLabel} 필터`}
      className="search-filter-toolbar-popover"
      ref={popoverRef}
      role="dialog"
      style={popoverStyle}
    >
      <div className="search-filter-toolbar-popover-body">
        <SearchFilterFields
          model={{ ...model, config }}
          variant="bottomSheet"
        />
      </div>
      {hasFooter && (
        <footer className="search-filter-toolbar-popover-footer">
          <button type="button" onClick={onReset}>
            전체 해제
          </button>
          <button type="button" onClick={onApply}>
            필터 적용
          </button>
        </footer>
      )}
    </div>,
    document.body,
  );
}
