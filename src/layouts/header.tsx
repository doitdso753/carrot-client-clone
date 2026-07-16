import { useState, type ReactNode } from 'react';
import { LogoIcon } from '@/assets/icons';
import useElementHeightCssVariable from '@/hooks/use-element-height-css-variable.ts';
import HeaderCategoryMobileNav from '@/layouts/header-with-search/nav/mobile/header-category-mobile-nav.tsx';
import { HEADER_CATEGORY_ITEMS } from '@/types/header-category-items.ts';

export default function Header(): ReactNode {
  const headerRef = useElementHeightCssVariable<HTMLElement>('--header-height');
  return (
    <header
      className="header-wrapper flex items-center justify-between"
      ref={headerRef}
    >
      <a className="flex items-center gap-3" href="/" aria-label="당근 홈">
        <LogoIcon />
      </a>
    </header>
  );
}
