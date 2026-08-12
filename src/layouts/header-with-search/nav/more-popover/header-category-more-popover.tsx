import type { ReactNode } from 'react';
import { useLocation } from 'react-router';
import useOutsidePointerDown from '@/hooks/interaction/use-outside-pointer-down.ts';
import HeaderCategoryPopoverItem from '@/layouts/header-with-search/nav/more-popover/header-category-popover-item.tsx';
import type { HeaderCategoryNavItemData } from '@/types/header-category.ts';
import { EllipsisIcon } from '@/assets/icons';

type HeaderCategoryMorePopoverProps = {
  items: HeaderCategoryNavItemData[];
  isActive: boolean;
  isOpen: boolean;
  triggerIcon?: ReactNode;
  onClose: () => void;
  onToggle: () => void;
};

// 데스크톱 카테고리 목록이 넘칠 때 숨겨진 항목을 보여주는 더보기 팝오버 컴포넌트
export default function HeaderCategoryMorePopover({
  items,
  isActive,
  isOpen,
  triggerIcon,
  onClose,
  onToggle,
}: HeaderCategoryMorePopoverProps): ReactNode {
  const wrapperRef = useOutsidePointerDown<HTMLDivElement>({
    isEnabled: isOpen,
    onOutsidePointerDown: onClose,
  });
  const { pathname } = useLocation();
  const sortedItems = [...items].sort((currentItem, nextItem) => {
    if (currentItem.routing === pathname) {
      return -1;
    }

    if (nextItem.routing === pathname) {
      return 1;
    }

    return 0;
  });

  return (
    <div className="relative shrink-0" ref={wrapperRef}>
      <button
        className={`common-item-trigger header-category-more-button ${
          isActive ? 'is-active' : 'is-disabled'
        }`}
        type="button"
        aria-label="카테고리 더보기"
        aria-disabled={!isActive}
        aria-expanded={isOpen}
        disabled={!isActive}
        onClick={onToggle}
      >
        {triggerIcon ?? <EllipsisIcon />}
      </button>
      {isActive && isOpen && (
        <div className="header-category-popover">
          {sortedItems.map((category, index) => (
            <HeaderCategoryPopoverItem
              item={category}
              key={category.label}
              hasSeparator={index === 0 && category.routing === pathname}
              isSelected={category.routing === pathname}
              popoverOptionPlacement="left"
            />
          ))}
        </div>
      )}
    </div>
  );
}
