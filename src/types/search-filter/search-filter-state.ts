import type {
  SearchFilterFieldName,
  SearchFilterSectionKey,
} from './search-filter-configs.ts';

export type SearchFilterPriceInputFieldCode = 'maximumPrice' | 'minimumPrice';

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

export type SearchFilterChangeHandlers = {
  // 선택된 옵션 코드 목록 전체를 변경
  onSectionSelectionChange: (
    key: SearchFilterSectionKey,
    selectedCodes: string[],
  ) => void;
  // 특정 옵션 코드 선택/해제 (checkbox)
  onSectionOptionToggle: (
    key: SearchFilterSectionKey,
    optionCode: string,
  ) => void;
  // 입력 필드의 값 변경
  onSectionInputChange: (
    key: SearchFilterSectionKey,
    field: SearchFilterFieldName,
    value: string,
  ) => void;
  // 특정 옵션 코드 하나를 단일 선택 (radio)
  onSectionOptionSelect: (
    key: SearchFilterSectionKey,
    optionCode: string,
  ) => void;
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
