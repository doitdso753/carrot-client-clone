import type { RefObject } from 'react';
import type { CategoryItem } from '@/types/category.ts';

export type HeaderCategoryNavItemType = 'default' | 'external' | 'popover';

export type HeaderCategoryNavItemData = CategoryItem & {
  type: HeaderCategoryNavItemType;
  options?: {
    label: string;
    routing: string;
  }[];
};

export type HeaderCategoryOverflowState = {
  navRef: RefObject<HTMLElement | null>;
  hasOverflow: boolean;
  isScrollEnd: boolean;
};
