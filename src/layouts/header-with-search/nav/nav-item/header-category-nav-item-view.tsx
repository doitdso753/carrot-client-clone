import type { ReactNode } from 'react';
import CategoryIcon from '@/components/ui/category-icon.tsx';
import type { HeaderCategoryNavItemData } from '@/types/header-category.ts';

type HeaderCategoryNavItemViewProps = {
  item: HeaderCategoryNavItemData;
  actionIcon?: ReactNode;
};

// 헤더 카테고리 항목 안의 아이콘, 라벨, 액션 아이콘을 그리는 공통 컴포넌트
export default function HeaderCategoryNavItemView({
  item,
  actionIcon,
}: HeaderCategoryNavItemViewProps): ReactNode {
  return (
    <>
      <span className="header-category-icon shrink-0">
        <CategoryIcon iconName={item.iconName} />
      </span>
      <span>{item.label}</span>
      {actionIcon && (
        <span className="header-category-action-icon shrink-0 text-(--color-palette-gray-700)">
          {actionIcon}
        </span>
      )}
    </>
  );
}
