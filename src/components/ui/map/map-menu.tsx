import { useState, type ReactNode } from 'react';
import { MenuIcon } from '@/assets/icons';
import HeaderCategoryMorePopover from '@/layouts/header-with-search/nav/more-popover/header-category-more-popover.tsx';
import { HEADER_CATEGORY_ITEMS } from '@/types/header';

// 지도 화면 우측 상단의 전체 서비스 메뉴 제어
export default function MapMenu(): ReactNode {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="map-menu">
      <HeaderCategoryMorePopover
        items={HEADER_CATEGORY_ITEMS}
        isActive
        isOpen={isOpen}
        triggerIcon={<MenuIcon />}
        onClose={() => setIsOpen(false)}
        onToggle={() => setIsOpen((currentValue) => !currentValue)}
      />
    </div>
  );
}
