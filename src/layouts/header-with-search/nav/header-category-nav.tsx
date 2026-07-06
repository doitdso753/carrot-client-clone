import { useState, type ReactNode } from 'react';
import HeaderCategoryHorizontalNav from '@/layouts/header-with-search/nav/header-category-horizontal-nav.tsx';
import HeaderCategoryMobileNav from '@/layouts/header-with-search/nav/mobile/header-category-mobile-nav.tsx';
import { HEADER_CATEGORY_ITEMS } from '@/types/header-category-items.ts';

// 모바일 메뉴와 데스크톱 카테고리 목록을 함께 배치하는 헤더 카테고리 컴포넌트
export default function HeaderCategoryNav(): ReactNode {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="header-category-nav-wrapper flex min-w-0 flex-1">
      <HeaderCategoryMobileNav
        items={HEADER_CATEGORY_ITEMS}
        isOpen={isMobileNavOpen}
        onToggle={() => setIsMobileNavOpen((currentValue) => !currentValue)}
      />
      <HeaderCategoryHorizontalNav items={HEADER_CATEGORY_ITEMS} />
    </div>
  );
}
