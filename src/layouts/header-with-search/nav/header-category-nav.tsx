import { useState, type ReactNode } from 'react';
import { SearchIcon } from '@/assets/icons';
import HeaderCategoryHorizontalNav from '@/layouts/header-with-search/nav/header-category-horizontal-nav.tsx';
import HeaderCategoryMobileNav from '@/layouts/header-with-search/nav/mobile/header-category-mobile-nav.tsx';
import { HEADER_CATEGORY_ITEMS } from '@/types/header-category-items.ts';

// 모바일 메뉴와 데스크톱 카테고리 목록을 함께 배치하는 헤더 카테고리 컴포넌트
type HeaderCategoryNavProps = {
  isSearchOpen: boolean;
  onMobileNavOpenChange: (isOpen: boolean) => void;
  onToggleSearch: () => void;
};

export default function HeaderCategoryNav({
  isSearchOpen,
  onMobileNavOpenChange,
  onToggleSearch,
}: HeaderCategoryNavProps): ReactNode {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleToggleMobileNav = (): void => {
    setIsMobileNavOpen((currentValue) => {
      const nextValue = !currentValue;
      onMobileNavOpenChange(nextValue);
      return nextValue;
    });
  };

  return (
    <div className="header-category-nav-wrapper flex min-w-0 flex-1">
      <button
        className="header-category-search-button"
        type="button"
        aria-controls="header-mobile-search-panel"
        aria-expanded={isSearchOpen}
        aria-label={isSearchOpen ? '검색창 닫기' : '검색창 열기'}
        onClick={onToggleSearch}
      >
        <SearchIcon />
      </button>
      <HeaderCategoryMobileNav
        items={HEADER_CATEGORY_ITEMS}
        isOpen={isMobileNavOpen}
        onToggle={handleToggleMobileNav}
      />
      <HeaderCategoryHorizontalNav items={HEADER_CATEGORY_ITEMS} />
    </div>
  );
}
