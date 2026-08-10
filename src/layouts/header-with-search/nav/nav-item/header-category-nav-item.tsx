import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ExternalLinkIcon } from '@/assets/icons';
import HeaderCategoryNavItemView from '@/layouts/header-with-search/nav/nav-item/header-category-nav-item-view.tsx';
import HeaderCategoryPopoverNavItem from '@/layouts/header-with-search/nav/nav-item/header-category-popover-nav-item.tsx';
import type { HeaderCategoryNavItemData } from '@/types/header-category.ts';

type HeaderCategoryNavItemProps = {
  item: HeaderCategoryNavItemData;
};

function HeaderCategoryDefaultNavItem({
  item,
}: HeaderCategoryNavItemProps): ReactNode {
  return (
    <Link
      className="common-item-trigger header-category-nav-item-trigger"
      to={item.routing}
    >
      <HeaderCategoryNavItemView item={item} />
    </Link>
  );
}

function HeaderCategoryExternalNavItem({
  item,
}: HeaderCategoryNavItemProps): ReactNode {
  return (
    <Link
      className="common-item-trigger header-category-nav-item-trigger"
      target="_blank"
      rel="noreferrer noopener"
      to={item.routing}
    >
      <HeaderCategoryNavItemView
        item={item}
        actionIcon={<ExternalLinkIcon />}
      />
    </Link>
  );
}

// 카테고리 타입에 따라 알맞은 헤더 카테고리 항목 컴포넌트를 선택합니다.
export default function HeaderCategoryNavItem({
  item,
}: HeaderCategoryNavItemProps): ReactNode {
  if (item.type === 'external') {
    return <HeaderCategoryExternalNavItem item={item} />;
  }

  if (item.type === 'popover') {
    return <HeaderCategoryPopoverNavItem item={item} />;
  }

  return <HeaderCategoryDefaultNavItem item={item} />;
}
