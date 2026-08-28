import type { CategoryItem } from './category.ts';

export const CATEGORIES: CategoryItem[] = [
  {
    code: 'buySell',
    label: '중고거래',
    iconName: 'shoppingBag',
    routing: '/buy-sell',
  },
  {
    code: 'localProfile',
    label: '동네업체',
    iconName: 'store',
    routing: '/local-profile',
  },
  {
    code: 'cars',
    label: '중고차',
    iconName: 'car',
    routing: '/cars',
  },
  {
    code: 'community',
    label: '동네생활',
    iconName: 'document',
    routing: '/community',
  },
  {
    code: 'group',
    label: '모임',
    iconName: 'group',
    routing: '/group',
  },
  {
    code: 'jobs',
    label: '알바/과외',
    iconName: 'searchUser',
    routing: '/jobs',
  },
  {
    code: 'realty',
    label: '부동산',
    iconName: 'home',
    routing: '/realty',
  },
  {
    code: 'cafe',
    label: '카페',
    iconName: 'cafe',
    routing: '/cafe',
  },
] as const;
