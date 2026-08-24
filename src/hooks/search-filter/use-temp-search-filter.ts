import { useCallback, useReducer } from 'react';
import useSearchFilterActions from '@/hooks/search-filter/use-search-filter-actions.ts';
import useSearchFilterSelection from '@/hooks/search-filter/use-search-filter-selection.ts';
import searchFilterReducer from '@/reducers/search-filter-reducer.ts';
import {
  INITIAL_SEARCH_FILTER_STATE,
  type SearchFilterChangeHandlers,
  type SearchFilterConfig,
  type SearchFilterState,
  type SelectedFilterBySectionKey,
} from '@/types/search-filter';

type UseTempSearchFilterOptions = {
  config: SearchFilterConfig;
  filterState: SearchFilterState;
  onApply: (filterState: SearchFilterState) => void;
};

type UseTempSearchFilterReturn = {
  actions: SearchFilterChangeHandlers;
  filterState: SearchFilterState;
  hasSelectedFilter: boolean;
  selectedFilterBySectionKey: SelectedFilterBySectionKey;
  apply: () => void;
  applyPriceRange: () => void;
  open: () => void;
  reset: () => void;
};

export default function useTempSearchFilter({
  config,
  filterState,
  onApply,
}: UseTempSearchFilterOptions): UseTempSearchFilterReturn {
  const [tempFilterState, dispatch] = useReducer(
    searchFilterReducer,
    INITIAL_SEARCH_FILTER_STATE,
  );
  const actions = useSearchFilterActions({
    dispatch,
    isAppliedPriceRangeClearedOnInput: true,
  });
  const { hasSelectedSectionFilter, selectedFilterBySectionKey } =
    useSearchFilterSelection(config, tempFilterState);
  const hasSelectedFilter =
    hasSelectedSectionFilter ||
    Boolean(tempFilterState.selectedPrice) ||
    Boolean(tempFilterState.minimumPrice) ||
    Boolean(tempFilterState.maximumPrice);

  // 팝업 진입 시 임시 필터 초기화
  const open = useCallback((): void => {
    dispatch({ type: 'replace', filterState });
  }, [dispatch, filterState]);

  // 임시 필터 전체 초기화
  const reset = useCallback((): void => {
    dispatch({ type: 'reset' });
  }, [dispatch]);

  // 임시 가격 범위 확정
  const applyPriceRange = useCallback((): void => {
    dispatch({ type: 'applyPriceRange' });
  }, [dispatch]);

  // 임시 필터의 실제 상태 반영
  const apply = useCallback((): void => {
    const nextFilterState = tempFilterState.appliedPriceRange
      ? tempFilterState
      : searchFilterReducer(tempFilterState, { type: 'applyPriceRange' });

    onApply(nextFilterState);
  }, [onApply, tempFilterState]);

  return {
    actions,
    filterState: tempFilterState,
    hasSelectedFilter,
    selectedFilterBySectionKey,
    apply,
    applyPriceRange,
    open,
    reset,
  };
}
