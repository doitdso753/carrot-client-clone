import type { CategoryItem } from '@/types/types.ts';

export const POPULAR_KEYWORDS = [
  '에어컨',
  '에어컨청소',
  '노트북',
  '원룸',
  '현대 중고차',
  '이사짐 알바',
  '근처 맛집',
  '투표',
  '동네친구',
  '배드민턴 모임',
  '자전거',
  '플스',
  '투룸 빌라',
  '닌텐도',
  '서빙 알바',
  '기아 중고차',
  '전세 매물',
] as const;

export const HERO_SEARCH_KEYWORDS = [
  '맛집',
  '자전거',
  '카페',
  '아이폰',
  '알바',
  '중고차',
  '원룸',
  '러닝모임',
  '동네친구',
] as const;

export const CATEGORIES: CategoryItem[] = [
  {
    label: '중고거래',
    iconName: 'shoppingBag',
  },
  {
    label: '동네업체',
    iconName: 'store',
  },
  {
    label: '알바/과외',
    iconName: 'searchUser',
  },
  {
    label: '중고차',
    iconName: 'car',
  },
  {
    label: '동네생활',
    iconName: 'document',
  },
  {
    label: '모임',
    iconName: 'group',
  },
  {
    label: '부동산',
    iconName: 'home',
  },
  {
    label: '카페',
    iconName: 'mug',
  },
] as const;

export const NEIGHBORHOODS = [
  '송도동',
  '역삼동',
  '물금읍',
  '봉담읍',
  '배방읍',
  '서초동',
  '옥정동',
  '신림동',
  '불당동',
  '향남읍',
  '청담동',
  '다산동',
  '별내동',
  '화도읍',
  '다사읍',
  '마곡동',
  '압구정동',
  '배곧동',
  '고덕동',
  '오창읍',
] as const;
