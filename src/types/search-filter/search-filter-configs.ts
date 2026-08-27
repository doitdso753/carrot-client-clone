import type { ComponentType } from 'react';
import { BUY_SELL_FILTER_CATEGORIES } from '@/types/buy-sell';
import {
  CAR_BRANDS,
  CAR_BRAND_ICONS,
  CAR_FUEL_TYPES,
  CAR_SALE_TYPES,
  CAR_TRANSMISSIONS,
  CAR_TYPES,
} from '@/types/cars';
import {
  LOCAL_PROFILE_CATEGORIES,
  LOCAL_PROFILE_OPTIONS,
} from '@/types/local-profile';
import { COMMUNITY_CATEGORIES } from '@/types/community';

export const SEARCH_FILTER_AVAILABLE_ONLY_CODE = 'availableOnly';
const CURRENT_YEAR = new Date().getFullYear();

export const WEEKDAY_ITEMS = [
  { code: 'monday', label: '월' },
  { code: 'tuesday', label: '화' },
  { code: 'wednesday', label: '수' },
  { code: 'thursday', label: '목' },
  { code: 'friday', label: '금' },
  { code: 'saturday', label: '토' },
  { code: 'sunday', label: '일' },
] as const;

export type SearchFilterVariant =
  'buySell' | 'cars' | 'community' | 'localProfile';
export type SearchFilterViewType = 'aside' | 'toolbar';

export type SearchFilterItem = {
  code: string;
  icon?: ComponentType;
  label: string;
};

export type SearchFilterSectionKey =
  | 'location'
  | 'availability'
  | 'category'
  | 'brand'
  | 'carType'
  | 'fuel'
  | 'price'
  | 'year'
  | 'mileage'
  | 'transmission'
  | 'saleType'
  | 'options'
  | 'weekday'
  | 'time';

export type SelectedSearchFilterItem = SearchFilterItem & {
  sectionKey: SearchFilterSectionKey;
};

export type SearchFilterFieldName =
  'maximumPrice' | 'minimumPrice' | 'selectedPrice';

export type SearchFilterSectionSelection = {
  codes?: string[];
  value?: string | null;
};

export type SelectedFilterBySectionKey = Partial<
  Record<SearchFilterSectionKey, SearchFilterSectionSelection>
>;

export type InitialFilterCodeMap = Partial<
  Record<SearchFilterSectionKey, string>
>;

export type SearchFilterSectionType =
  | 'checkbox'
  | 'chip'
  | 'location'
  | 'link'
  | 'price'
  | 'radio'
  | 'range'
  | 'time'
  | 'weekday';

export type SearchFilterRange = {
  maximum: number;
  minimum: number;
  step: number;
  suffix: string;
};

export type BottomSheetApplyMode = 'confirm' | 'instant';

type SearchFilterSectionBase = {
  key: SearchFilterSectionKey;
  label: string;
};

type SearchFilterOptionSectionBase = SearchFilterSectionBase & {
  data: readonly (SearchFilterItem | string)[];
  defaultCode?: string;
};

type CheckboxFilterSection = SearchFilterOptionSectionBase & {
  bottomSheetType?: 'chip';
  isMultiple?: boolean;
  type: 'checkbox';
};

type ChipFilterSection = SearchFilterOptionSectionBase & {
  flexDirection?: 'column' | 'row';
  isMultiple?: boolean;
  type: 'chip';
};

type LinkFilterSection = SearchFilterOptionSectionBase & {
  bottomSheetType?: 'chip';
  isMultiple?: boolean;
  type: 'link';
};

type LocationFilterSection = SearchFilterSectionBase & {
  type: 'location';
};

type PriceFilterSection = SearchFilterSectionBase & {
  type: 'price';
};

type RadioFilterSection = SearchFilterOptionSectionBase & {
  icons?: Readonly<Record<string, string>>;
  isScrollable?: boolean;
  type: 'radio';
};

type RangeFilterSection = SearchFilterSectionBase & {
  range: SearchFilterRange;
  type: 'range';
};

type TimeFilterSection = SearchFilterSectionBase & {
  type: 'time';
};

type WeekdayFilterSection = SearchFilterSectionBase & {
  type: 'weekday';
};

export type SearchFilterSection =
  | CheckboxFilterSection
  | ChipFilterSection
  | LinkFilterSection
  | LocationFilterSection
  | PriceFilterSection
  | RadioFilterSection
  | RangeFilterSection
  | TimeFilterSection
  | WeekdayFilterSection;

export type SearchFilterConfig = {
  bottomSheetApplyMode?: BottomSheetApplyMode;
  filterStorageKey: string;
  popupTitle: string;
  sections: readonly SearchFilterSection[];
  viewType: SearchFilterViewType;
};

export const SEARCH_FILTER_CONFIGS: Record<
  SearchFilterVariant,
  SearchFilterConfig
> = {
  buySell: {
    filterStorageKey: 'search-filter:buy-sell',
    popupTitle: '중고거래 검색 필터',
    viewType: 'aside',
    sections: [
      { key: 'location', label: '위치', type: 'location' },
      {
        data: [
          {
            code: SEARCH_FILTER_AVAILABLE_ONLY_CODE,
            label: '거래 가능한 보기',
          },
        ],
        key: 'availability',
        label: '상태',
        type: 'checkbox',
      },
      {
        data: BUY_SELL_FILTER_CATEGORIES,
        key: 'category',
        label: '카테고리',
        type: 'radio',
      },
      { key: 'price', label: '가격', type: 'price' },
    ],
  },
  cars: {
    filterStorageKey: 'search-filter:cars',
    popupTitle: '중고차 검색 필터',
    viewType: 'aside',
    sections: [
      { key: 'location', label: '위치', type: 'location' },
      {
        data: [
          {
            code: SEARCH_FILTER_AVAILABLE_ONLY_CODE,
            label: '거래 가능한 보기',
          },
        ],
        key: 'availability',
        label: '상태',
        type: 'checkbox',
      },
      {
        data: CAR_BRANDS,
        icons: CAR_BRAND_ICONS,
        isScrollable: true,
        key: 'brand',
        label: '브랜드',
        type: 'radio',
      },
      {
        bottomSheetType: 'chip',
        data: CAR_TYPES,
        key: 'carType',
        label: '차종',
        type: 'checkbox',
      },
      {
        bottomSheetType: 'chip',
        data: CAR_FUEL_TYPES,
        key: 'fuel',
        label: '연료',
        type: 'checkbox',
      },
      {
        key: 'price',
        label: '가격',
        range: { maximum: 10000, minimum: 100, step: 100, suffix: '만원' },
        type: 'range',
      },
      {
        key: 'year',
        label: '연식',
        range: { maximum: CURRENT_YEAR, minimum: 1994, step: 1, suffix: '년' },
        type: 'range',
      },
      {
        key: 'mileage',
        label: '주행거리',
        range: { maximum: 20, minimum: 2, step: 2, suffix: '만km' },
        type: 'range',
      },
      {
        data: CAR_TRANSMISSIONS,
        flexDirection: 'row',
        key: 'transmission',
        label: '변속기',
        type: 'chip',
      },
      {
        data: CAR_SALE_TYPES,
        flexDirection: 'row',
        key: 'saleType',
        label: '판매 방식',
        type: 'chip',
      },
    ],
  },
  community: {
    bottomSheetApplyMode: 'instant',
    filterStorageKey: 'search-filter:community',
    popupTitle: '동네생활 카테고리',
    viewType: 'aside',
    sections: [
      { key: 'location', label: '위치', type: 'location' },
      {
        bottomSheetType: 'chip',
        data: COMMUNITY_CATEGORIES,
        defaultCode: 'all',
        isMultiple: false,
        key: 'category',
        label: '카테고리',
        type: 'link',
      },
    ],
  },
  localProfile: {
    filterStorageKey: 'search-filter:local-profile',
    popupTitle: '동네업체 검색 필터',
    viewType: 'toolbar',
    sections: [
      { key: 'location', label: '위치', type: 'location' },
      {
        data: LOCAL_PROFILE_CATEGORIES,
        key: 'category',
        label: '카테고리',
        type: 'checkbox',
      },
      {
        data: LOCAL_PROFILE_OPTIONS,
        flexDirection: 'row',
        key: 'options',
        label: '옵션',
        type: 'chip',
      },
    ],
  },
};
