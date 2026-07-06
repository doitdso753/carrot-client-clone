import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ChevronDownIcon, CloseIcon, LogoIcon } from '@/assets/icons';
import type { HeaderCategoryNavItemData } from '@/types/header-category.ts';

type HeaderCategoryMobileNavPopoverProps = {
  items: HeaderCategoryNavItemData[];
  openedCategoryCode: string | null;
  onClose: () => void;
  onTogglePopoverItem: (categoryCode: string) => void;
};

type HeaderCategoryMobileNavLinkItemProps = {
  item: HeaderCategoryNavItemData;
  onClose: () => void;
};

type HeaderCategoryMobileNavPopoverItemProps =
  HeaderCategoryMobileNavLinkItemProps & {
    isOpen: boolean;
    onToggle: (categoryCode: string) => void;
  };

function HeaderCategoryMobileNavLinkItem({
  item,
  onClose,
}: HeaderCategoryMobileNavLinkItemProps): ReactNode {
  return (
    <Link
      className="header-category-mobile-nav-item"
      target={item.type === 'external' ? '_blank' : undefined}
      rel={item.type === 'external' ? 'noreferrer noopener' : undefined}
      to={item.routing}
      onClick={onClose}
    >
      <span>{item.label}</span>
    </Link>
  );
}

function HeaderCategoryMobileNavPopoverItem({
  item,
  isOpen,
  onClose,
  onToggle,
}: HeaderCategoryMobileNavPopoverItemProps): ReactNode {
  return (
    <div className="header-category-mobile-nav-item-popover">
      <button
        className="header-category-mobile-nav-item"
        type="button"
        aria-expanded={isOpen}
        onClick={() => onToggle(item.code)}
      >
        <span>{item.label}</span>
        <span
          className={`header-category-mobile-nav-item-icon ${
            isOpen ? 'is-open' : ''
          }`}
          aria-hidden="true"
        >
          <ChevronDownIcon />
        </span>
      </button>
      {isOpen && (
        <div className="header-category-mobile-nav-item-popover-items">
          {item.options?.map((option) => (
            <Link
              className="header-category-mobile-nav-item-popover-item"
              key={option.label}
              to={option.routing}
              onClick={onClose}
            >
              {option.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// 모바일 카테고리 내비게이션의 전체 화면 popover 컴포넌트
export default function HeaderCategoryMobileNavPopover({
  items,
  openedCategoryCode,
  onClose,
  onTogglePopoverItem,
}: HeaderCategoryMobileNavPopoverProps): ReactNode {
  return (
    <div
      className="header-category-mobile-nav-popover"
      role="navigation"
      aria-label="카테고리 내비게이션"
    >
      <div className="header-category-mobile-nav-popover-header">
        <Link to="/" aria-label="당근 홈">
          <LogoIcon />
        </Link>
        <button
          className="header-category-mobile-nav-popover-close-button"
          type="button"
          aria-label="카테고리 내비게이션 닫기"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>
      <nav className="header-category-mobile-nav-popover-items">
        {items.map((category) => {
          if (category.type === 'popover') {
            return (
              <HeaderCategoryMobileNavPopoverItem
                item={category}
                key={category.label}
                isOpen={openedCategoryCode === category.code}
                onClose={onClose}
                onToggle={onTogglePopoverItem}
              />
            );
          }

          return (
            <HeaderCategoryMobileNavLinkItem
              item={category}
              key={category.label}
              onClose={onClose}
            />
          );
        })}
      </nav>
    </div>
  );
}
