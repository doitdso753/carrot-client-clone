import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router';
import { ChevronDownIcon } from '@/assets/icons';
import useAnchorHoverPopover from '@/hooks/use-anchor-hover-popover.ts';
import HeaderCategoryNavItemView from '@/layouts/header-with-search/nav/nav-item/header-category-nav-item-view.tsx';
import type { HeaderCategoryNavItemData } from '@/types/header-category.ts';

type HeaderCategoryPopoverNavItemProps = {
  item: HeaderCategoryNavItemData;
};

type HeaderCategoryNavItemPopoverProps = {
  options: NonNullable<HeaderCategoryNavItemData['options']>;
  popoverStyle: CSSProperties;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

function HeaderCategoryNavItemPopover({
  options,
  popoverStyle,
  onMouseEnter,
  onMouseLeave,
}: HeaderCategoryNavItemPopoverProps): ReactNode {
  return (
    <div
      className="header-category-nav-item-popover"
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
  const { anchorRef, isPopoverOpen, popoverStyle, openPopover, closePopover } =
    useAnchorHoverPopover<HTMLAnchorElement>();

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
        className="header-category-nav-item-trigger"
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
          popoverStyle={popoverStyle}
          onMouseEnter={openPopover}
          onMouseLeave={closePopover}
        />
      )}
    </div>
  );
}
