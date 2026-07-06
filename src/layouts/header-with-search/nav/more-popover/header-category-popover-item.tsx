import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ChevronDownIcon, ExternalLinkIcon } from '@/assets/icons';
import CategoryIcon from '@/components/ui/category-icon.tsx';
import type { HeaderCategoryNavItemData } from '@/types/header-category.ts';

type HeaderCategoryPopoverItemProps = {
  item: HeaderCategoryNavItemData;
  hasSeparator?: boolean;
  popoverOptionPlacement?: 'inline' | 'left';
};

type HeaderCategoryPopoverItemViewProps = {
  item: HeaderCategoryNavItemData;
};

type HeaderCategoryNestedPopoverItemProps = HeaderCategoryPopoverItemProps & {
  popoverOptionPlacement: NonNullable<
    HeaderCategoryPopoverItemProps['popoverOptionPlacement']
  >;
};

function HeaderCategoryPopoverItemView({
  item,
}: HeaderCategoryPopoverItemViewProps): ReactNode {
  const actionIcon =
    item.type === 'external' ? (
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
  popoverOptionPlacement,
}: HeaderCategoryNestedPopoverItemProps): ReactNode {
  return (
    <div
      className={`header-category-popover-item-wrapper ${
        hasSeparator ? 'has-separator' : ''
      }`}
    >
      <Link className="header-category-popover-item" to={item.routing}>
        <HeaderCategoryPopoverItemView item={item} />
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
}: HeaderCategoryPopoverItemViewProps & {
  hasSeparator?: boolean;
}): ReactNode {
  const linkElement = (
    <Link
      className="header-category-popover-item"
      target={item.type === 'external' ? '_blank' : undefined}
      rel={item.type === 'external' ? 'noreferrer noopener' : undefined}
      to={item.routing}
    >
      <HeaderCategoryPopoverItemView item={item} />
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
  popoverOptionPlacement = 'inline',
}: HeaderCategoryPopoverItemProps): ReactNode {
  if (item.type === 'popover') {
    return (
      <HeaderCategoryNestedPopoverItem
        item={item}
        hasSeparator={hasSeparator}
        popoverOptionPlacement={popoverOptionPlacement}
      />
    );
  }

  return (
    <HeaderCategoryLinkPopoverItem item={item} hasSeparator={hasSeparator} />
  );
}
