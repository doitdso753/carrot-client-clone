import { CATEGORIES } from '@/types/constants.ts';
import type { HeaderCategoryNavItemData } from '@/types/header-category.ts';
import type { CategoryCode } from '@/types/types.ts';

const HEADER_CATEGORY_CONFIGS: Partial<
  Record<CategoryCode, Pick<HeaderCategoryNavItemData, 'type' | 'options'>>
> = {
  jobs: {
    type: 'popover',
    options: [
      { label: '알바 검색', routing: '/jobs' },
      { label: '과외/레슨 검색', routing: '/jobs/lessons' },
      { label: '당글알바 소개', routing: '/jobs/about' },
      { label: '기업형 서비스', routing: '/jobs/business' },
      { label: '신뢰와 안전', routing: '/jobs/safety' },
    ],
  },
  cars: {
    type: 'popover',
    options: [
      { label: '중고차 검색', routing: '/cars' },
      { label: '딜러용 서비스', routing: '/cars/sell' },
    ],
  },
  realty: {
    type: 'external',
  },
  cafe: {
    type: 'external',
  },
};

export const HEADER_CATEGORY_ITEMS: HeaderCategoryNavItemData[] =
  CATEGORIES.map((category) => {
    const categoryConfig = HEADER_CATEGORY_CONFIGS[category.code];

    return {
      ...category,
      type: categoryConfig?.type ?? 'default',
      options: categoryConfig?.options,
    };
  });
