import { useEffect, useState, type ReactNode } from 'react';
import useHeaderCategoryOverflow from '@/hooks/use-header-category-overflow.ts';
import HeaderCategoryMorePopover from '@/layouts/header-with-search/nav/more-popover/header-category-more-popover.tsx';
import HeaderCategoryNavItem from '@/layouts/header-with-search/nav/nav-item/header-category-nav-item.tsx';
import type { HeaderCategoryNavItemData } from '@/types/header-category.ts';

type HeaderCategoryHorizontalNavProps = {
  items: HeaderCategoryNavItemData[];
};

// 헤더의 가로 카테고리 목록과 더보기 버튼을 관리하는 컴포넌트
export default function HeaderCategoryHorizontalNav({
  items,
}: HeaderCategoryHorizontalNavProps): ReactNode {
  const { navRef, hasOverflow, isScrollEnd } = useHeaderCategoryOverflow();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const isMoreButtonActive = hasOverflow && !isScrollEnd;

  const handleClickMoreButton = (): void => {
    if (!isMoreButtonActive) {
      setIsPopoverOpen(false);
      return;
    }

    setIsPopoverOpen((currentValue) => !currentValue);
  };

  useEffect(() => {
    if (!isMoreButtonActive) {
      setIsPopoverOpen(false);
    }
  }, [isMoreButtonActive]);

  return (
    <>
      <nav
        className="header-category-nav scrollbar-hidden min-w-0 items-center overflow-x-auto whitespace-nowrap"
        aria-label="주요 메뉴"
        ref={navRef}
      >
        {items.map((category) => (
          <HeaderCategoryNavItem item={category} key={category.label} />
        ))}
      </nav>
      {hasOverflow && (
        <span
          className="header-category-nav-blur list-blur-effect"
          aria-hidden="true"
        />
      )}
      {hasOverflow && (
        <HeaderCategoryMorePopover
          items={items}
          isActive={isMoreButtonActive}
          isOpen={isPopoverOpen}
          onClose={() => setIsPopoverOpen(false)}
          onToggle={handleClickMoreButton}
        />
      )}
    </>
  );
}
