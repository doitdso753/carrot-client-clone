import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { CheckedIcon, ChevronDownIcon, ExternalLinkIcon } from '@/assets/icons';
import CategoryIcon from '@/components/ui/category-icon.tsx';
import type { HeaderCategoryNavItemData } from '@/types/header-category.ts';

type HeaderCategoryPopoverItemProps = {
  item: HeaderCategoryNavItemData;
  hasSeparator?: boolean;
  isSelected?: boolean;
  popoverOptionPlacement?: 'inline' | 'left';
};

type HeaderCategoryPopoverItemViewProps = {
  item: HeaderCategoryNavItemData;
  isSelected?: boolean;
};

type HeaderCategoryNestedPopoverItemProps = HeaderCategoryPopoverItemProps & {
  popoverOptionPlacement: NonNullable<
    HeaderCategoryPopoverItemProps['popoverOptionPlacement']
  >;
};

function HeaderCategoryPopoverItemView({
  item,
  isSelected = false,
}: HeaderCategoryPopoverItemViewProps): ReactNode {
  const actionIcon = isSelected ? (
    <CheckedIcon />
  ) : item.type === 'external' ? (
    <ExternalLinkIcon />
  ) : item.type === 'popover' ? (
    <ChevronDownIcon />
  ) : null;

  return (
    <>
      <span className="header-category-icon shrink-0">
        <CategoryIcon iconName={item.iconName} />
      </span>
      <span className="min-w-0 flex-1">{item.label}</span>
      {actionIcon && (
        <span className="header-category-action-icon shrink-0 text-(--color-palette-gray-700)">
          {actionIcon}
        </span>
      )}
    </>
  );
}

function HeaderCategoryNestedPopoverItem({
  item,
  hasSeparator = false,
  isSelected = false,
  popoverOptionPlacement,
}: HeaderCategoryNestedPopoverItemProps): ReactNode {
  return (
    <div
      className={`header-category-popover-item-wrapper ${
        hasSeparator ? 'has-separator' : ''
      }`}
    >
      <Link
        aria-current={isSelected ? 'page' : undefined}
        className={`header-category-popover-item ${
          isSelected ? 'is-selected' : ''
        }`}
        to={item.routing}
      >
        <HeaderCategoryPopoverItemView isSelected={isSelected} item={item} />
      </Link>
      <div
        className={`header-category-popover-nested header-category-popover-nested--${popoverOptionPlacement}`}
      >
        {item.options?.map((option) => (
          <Link
            className="header-category-popover-nested-item"
            key={option.label}
            to={option.routing}
          >
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function HeaderCategoryLinkPopoverItem({
  item,
  hasSeparator = false,
  isSelected = false,
}: HeaderCategoryPopoverItemViewProps & {
  hasSeparator?: boolean;
}): ReactNode {
  const linkElement = (
    <Link
      aria-current={isSelected ? 'page' : undefined}
      className={`header-category-popover-item ${
        isSelected ? 'is-selected' : ''
      }`}
      target={item.type === 'external' ? '_blank' : undefined}
      rel={item.type === 'external' ? 'noreferrer noopener' : undefined}
      to={item.routing}
    >
      <HeaderCategoryPopoverItemView isSelected={isSelected} item={item} />
    </Link>
  );

  if (hasSeparator) {
    return (
      <div className="header-category-popover-item-separator">
        {linkElement}
      </div>
    );
  }

  return linkElement;
}

// 더보기 팝오버 안에서 카테고리 타입에 맞는 항목을 렌더링하는 컴포넌트
export default function HeaderCategoryPopoverItem({
  item,
  hasSeparator = false,
  isSelected = false,
  popoverOptionPlacement = 'inline',
}: HeaderCategoryPopoverItemProps): ReactNode {
  if (item.type === 'popover') {
    return (
      <HeaderCategoryNestedPopoverItem
        item={item}
        hasSeparator={hasSeparator}
        isSelected={isSelected}
        popoverOptionPlacement={popoverOptionPlacement}
      />
    );
  }

  return (
    <HeaderCategoryLinkPopoverItem
      item={item}
      hasSeparator={hasSeparator}
      isSelected={isSelected}
    />
  );
}
