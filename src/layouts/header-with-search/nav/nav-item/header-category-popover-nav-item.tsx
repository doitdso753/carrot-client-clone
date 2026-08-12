import type { CSSProperties, ReactNode, RefObject } from 'react';
import { Link } from 'react-router';
import { ChevronDownIcon } from '@/assets/icons';
import useAnchorHoverPopover from '@/hooks/interaction/use-anchor-hover-popover.ts';
import HeaderCategoryNavItemView from '@/layouts/header-with-search/nav/nav-item/header-category-nav-item-view.tsx';
import type { HeaderCategoryNavItemData } from '@/types/header-category.ts';

type HeaderCategoryPopoverNavItemProps = {
  item: HeaderCategoryNavItemData;
};

type HeaderCategoryNavItemPopoverProps = {
  options: NonNullable<HeaderCategoryNavItemData['options']>;
  popoverRef: RefObject<HTMLDivElement | null>;
  popoverStyle: CSSProperties;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

function HeaderCategoryNavItemPopover({
  options,
  popoverRef,
  popoverStyle,
  onMouseEnter,
  onMouseLeave,
}: HeaderCategoryNavItemPopoverProps): ReactNode {
  return (
    <div
      className="header-category-nav-item-popover"
      ref={popoverRef}
      role="menu"
      style={popoverStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {options.map((option) => (
        <Link
          className="header-category-nav-item-popover-item"
          key={option.label}
          to={option.routing}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}

// hover 시 하위 옵션 팝오버를 여는 헤더 카테고리 항목 컴포넌트
export default function HeaderCategoryPopoverNavItem({
  item,
}: HeaderCategoryPopoverNavItemProps): ReactNode {
  const {
    anchorRef,
    closePopover,
    isPopoverOpen,
    openPopover,
    popoverRef,
    popoverStyle,
  } = useAnchorHoverPopover<HTMLAnchorElement>();

  return (
    <div
      className="header-category-nav-item-popover-wrapper"
      onMouseEnter={openPopover}
      onMouseLeave={closePopover}
      onFocus={openPopover}
      onBlur={closePopover}
    >
      <Link
        ref={anchorRef}
        className="common-item-trigger header-category-nav-item-trigger"
        to={item.routing}
        aria-haspopup="menu"
        aria-expanded={isPopoverOpen}
      >
        <HeaderCategoryNavItemView
          item={item}
          actionIcon={<ChevronDownIcon />}
        />
      </Link>
      {isPopoverOpen && item.options && (
        <HeaderCategoryNavItemPopover
          options={item.options}
          popoverRef={popoverRef}
          popoverStyle={popoverStyle}
          onMouseEnter={openPopover}
          onMouseLeave={closePopover}
        />
      )}
    </div>
  );
}
