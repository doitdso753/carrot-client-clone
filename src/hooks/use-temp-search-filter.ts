import { useCallback, useReducer } from 'react';
import useSearchFilterActions from '@/hooks/use-search-filter-actions.ts';
import useSearchFilterSelection from '@/hooks/use-search-filter-selection.ts';
import searchFilterReducer from '@/reducers/search-filter-reducer.ts';
import type {
  SearchFilterConfig,
  SelectedFilterBySectionKey,
} from '@/types/search-filter-configs.ts';
import {
  INITIAL_SEARCH_FILTER_STATE,
  type SearchFilterChangeHandlers,
  type SearchFilterState,
} from '@/types/search-filter-state.ts';

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

  const open = useCallback((): void => {
    dispatch({ type: 'replace', filterState });
  }, [dispatch, filterState]);

  const reset = useCallback((): void => {
    dispatch({ type: 'reset' });
  }, [dispatch]);

  const applyPriceRange = useCallback((): void => {
    dispatch({ type: 'applyPriceRange' });
  }, [dispatch]);

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
