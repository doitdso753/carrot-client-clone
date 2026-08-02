import type {
  SearchFilterFieldName,
  SearchFilterSectionKey,
} from '@/types/search-filter-configs.ts';
import {
  INITIAL_SEARCH_FILTER_STATE,
  type SearchFilterPriceInputFieldCode,
  type SearchFilterState,
} from '@/types/search-filter-state.ts';

export type SearchFilterAction =
  | {
      type: 'changePriceField';
      field: SearchFilterPriceInputFieldCode;
      value: string;
      isAppliedPriceRangeCleared: boolean;
    }
  | { type: 'selectPrice'; value: string }
  | { type: 'setCodes'; key: SearchFilterSectionKey; codes: string[] }
  | { type: 'toggleCode'; key: SearchFilterSectionKey; code: string }
  | { type: 'applyPriceRange' }
  | { type: 'removePriceRange' }
  | { type: 'removeSelectedCode'; key: SearchFilterSectionKey; code: string }
  | { type: 'replace'; filterState: SearchFilterState }
  | { type: 'reset' };

export function isPriceInputField(
  field: SearchFilterFieldName,
): field is SearchFilterPriceInputFieldCode {
  return field === 'maximumPrice' || field === 'minimumPrice';
}

function toggleCode(codes: string[], code: string): string[] {
  return codes.includes(code)
    ? codes.filter((currentCode) => currentCode !== code)
    : [...codes, code];
}

function selectPresetPrice(
  state: SearchFilterState,
  value: string,
): SearchFilterState {
  const maximumPrice = value.replace(/\D/g, '');

  return {
    ...state,
    appliedPriceRange: maximumPrice
      ? { maximumPrice, minimumPrice: '0' }
      : null,
    maximumPrice,
    minimumPrice: maximumPrice ? '0' : '',
    selectedPrice: value,
  };
}

function applyPriceRange(state: SearchFilterState): SearchFilterState {
  return {
    ...state,
    appliedPriceRange:
      state.minimumPrice || state.maximumPrice
        ? {
            maximumPrice: state.maximumPrice,
            minimumPrice: state.minimumPrice,
          }
        : null,
  };
}

function clearPriceRange(state: SearchFilterState): SearchFilterState {
  return {
    ...state,
    appliedPriceRange: null,
    maximumPrice: '',
    minimumPrice: '',
    selectedPrice: '',
  };
}

export default function searchFilterReducer(
  state: SearchFilterState,
  action: SearchFilterAction,
): SearchFilterState {
  switch (action.type) {
    case 'setCodes':
      return {
        ...state,
        selectedCodesByKey: {
          ...state.selectedCodesByKey,
          [action.key]: action.codes,
        },
      };

    case 'toggleCode':
      return {
        ...state,
        selectedCodesByKey: {
          ...state.selectedCodesByKey,
          [action.key]: toggleCode(
            state.selectedCodesByKey[action.key] ?? [],
            action.code,
          ),
        },
      };

    case 'selectPrice':
      return selectPresetPrice(state, action.value);

    case 'changePriceField':
      return {
        ...state,
        ...(action.isAppliedPriceRangeCleared
          ? { appliedPriceRange: null }
          : {}),
        [action.field]: action.value,
        selectedPrice: '',
      };

    case 'applyPriceRange':
      return applyPriceRange(state);

    case 'removePriceRange':
      return clearPriceRange(state);

    case 'removeSelectedCode':
      return {
        ...state,
        selectedCodesByKey: {
          ...state.selectedCodesByKey,
          [action.key]: (state.selectedCodesByKey[action.key] ?? []).filter(
            (currentCode) => currentCode !== action.code,
          ),
        },
      };

    case 'replace':
      return action.filterState;

    case 'reset':
      return INITIAL_SEARCH_FILTER_STATE;

    default:
      return state;
  }
}
