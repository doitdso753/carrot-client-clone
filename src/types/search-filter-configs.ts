import { BUY_SELL_FILTER_CATEGORIES } from '@/types/buy-sell-constants.ts';
import {
  LOCAL_PROFILE_CATEGORIES,
  LOCAL_PROFILE_OPTIONS,
} from '@/types/local-profile-constants.ts';

export const SEARCH_FILTER_AVAILABLE_ONLY_CODE = 'availableOnly';

export const WEEKDAY_ITEMS = [
  { code: 'monday', label: '월' },
  { code: 'tuesday', label: '화' },
  { code: 'wednesday', label: '수' },
  { code: 'thursday', label: '목' },
  { code: 'friday', label: '금' },
  { code: 'saturday', label: '토' },
  { code: 'sunday', label: '일' },
] as const;

export type SearchFilterVariant = 'buySell' | 'localProfile';

export type SearchFilterItem = {
  code: string;
  label: string;
};

export type SearchFilterSectionKey =
  | 'location'
  | 'availability'
  | 'category'
  | 'price'
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

export type SearchFilterSectionType =
  'checkbox' | 'chip' | 'location' | 'price' | 'radio' | 'time' | 'weekday';

export type SearchFilterSection = {
  data?: readonly (SearchFilterItem | string)[];
  key: SearchFilterSectionKey;
  label: string;
  type: SearchFilterSectionType;
};

export type SearchFilterConfig = {
  filterStorageKey: string;
  popupTitle: string;
  sections: readonly SearchFilterSection[];
};

export const SEARCH_FILTER_CONFIGS: Record<
  SearchFilterVariant,
  SearchFilterConfig
> = {
  buySell: {
    filterStorageKey: 'search-filter:buy-sell',
    popupTitle: '중고거래 검색 필터',
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
  localProfile: {
    filterStorageKey: 'search-filter:local-profile',
    popupTitle: '동네업체 검색 필터',
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
        key: 'options',
        label: '옵션',
        type: 'chip',
      },
    ],
  },
};
