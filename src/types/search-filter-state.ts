import type {
  SearchFilterFieldName,
  SearchFilterSectionKey,
} from '@/types/search-filter-configs.ts';

export type SearchFilterPriceInputFieldCode =
  | 'maximumPrice'
  | 'minimumPrice';

export type SearchFilterState = {
  appliedPriceRange: {
    maximumPrice: string;
    minimumPrice: string;
  } | null;
  maximumPrice: string;
  minimumPrice: string;
  selectedCodesByKey: Partial<Record<SearchFilterSectionKey, string[]>>;
  selectedPrice: string;
};

export type SearchFilterChangeActions = {
  onSectionCodesChange: (
    key: SearchFilterSectionKey,
    codes: string[],
  ) => void;
  onSectionCodeToggle: (key: SearchFilterSectionKey, code: string) => void;
  onSectionFieldChange: (
    key: SearchFilterSectionKey,
    field: SearchFilterFieldName,
    value: string,
  ) => void;
  onSectionValueChange: (key: SearchFilterSectionKey, value: string) => void;
};

export const INITIAL_SEARCH_FILTER_STATE: SearchFilterState = {
  appliedPriceRange: null,
  maximumPrice: '',
  minimumPrice: '',
  selectedCodesByKey: {},
  selectedPrice: '',
};

export function isSearchFilterState(
  value: unknown,
): value is SearchFilterState {
  return (
    typeof value === 'object' &&
    value !== null &&
    'appliedPriceRange' in value &&
    'maximumPrice' in value &&
    'minimumPrice' in value &&
    'selectedCodesByKey' in value &&
    'selectedPrice' in value &&
    (value.appliedPriceRange === null ||
      (typeof value.appliedPriceRange === 'object' &&
        'maximumPrice' in value.appliedPriceRange &&
        'minimumPrice' in value.appliedPriceRange &&
        typeof value.appliedPriceRange.maximumPrice === 'string' &&
        typeof value.appliedPriceRange.minimumPrice === 'string')) &&
    typeof value.maximumPrice === 'string' &&
    typeof value.minimumPrice === 'string' &&
    typeof value.selectedCodesByKey === 'object' &&
    value.selectedCodesByKey !== null &&
    Object.values(value.selectedCodesByKey).every(
      (codes) =>
        Array.isArray(codes) && codes.every((code) => typeof code === 'string'),
    ) &&
    typeof value.selectedPrice === 'string'
  );
}
