import { useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { MenuIcon } from '@/assets/icons';
import type { HeaderCategoryNavItemData } from '@/types/header-category.ts';
import HeaderCategoryMobileNavPopover from './header-category-mobile-nav-popover.tsx';

type HeaderCategoryMobileNavProps = {
  items: HeaderCategoryNavItemData[];
  isOpen: boolean;
  onToggle: () => void;
};

// 모바일 화면에서 전체 화면 카테고리 내비게이션을 표시하는 컴포넌트
export default function HeaderCategoryMobileNav({
  items,
  isOpen,
  onToggle,
}: HeaderCategoryMobileNavProps): ReactNode {
  const [openedCategoryCode, setOpenedCategoryCode] = useState<string | null>(
    null,
  );
  const [isClosing, setIsClosing] = useState(false);

  const handleCloseNav = (): void => {
    setOpenedCategoryCode(null);
    setIsClosing(true);
  };

  const handleCloseComplete = (): void => {
    setIsClosing(false);
    onToggle();
  };

  const handleTogglePopoverItem = (categoryCode: string): void => {
    setOpenedCategoryCode((currentCode) =>
      currentCode === categoryCode ? null : categoryCode,
    );
  };

  return (
    <>
      <button
        className="header-category-mobile-nav-button"
        type="button"
        aria-label="카테고리 내비게이션"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <MenuIcon />
      </button>
      {isOpen &&
        createPortal(
          <HeaderCategoryMobileNavPopover
            items={items}
            openedCategoryCode={openedCategoryCode}
            isClosing={isClosing}
            onClose={handleCloseNav}
            onCloseComplete={handleCloseComplete}
            onTogglePopoverItem={handleTogglePopoverItem}
          />,
          document.body,
        )}
    </>
  );
}
