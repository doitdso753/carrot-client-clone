import { useCallback } from 'react';
import usePageFilter from '@/hooks/use-page-filter.ts';
import useSearchFilterActions from '@/hooks/use-search-filter-actions.ts';
import useSearchFilterSelection from '@/hooks/use-search-filter-selection.ts';
import { hasAppliedRangeFilters } from '@/lib/search-filter-summary-utils.ts';
import searchFilterReducer, {
  type SearchFilterAction,
} from '@/reducers/search-filter-reducer.ts';
import type {
  SearchFilterConfig,
  SearchFilterSectionKey,
  SelectedFilterBySectionKey,
  SelectedSearchFilterItem,
} from '@/types/search-filter-configs.ts';
import {
  INITIAL_SEARCH_FILTER_STATE,
  isSearchFilterState,
  type SearchFilterChangeActions,
  type SearchFilterState,
} from '@/types/search-filter-state.ts';

function createReplaceAction(
  filterState: SearchFilterState,
): SearchFilterAction {
  return { type: 'replace', filterState };
}

type UseSearchFilterStateReturn = {
  actions: SearchFilterChangeActions;
  commands: {
    applyFilterState: (filterState: SearchFilterState) => void;
    applyPriceRange: () => void;
    removePriceRange: () => void;
    removeSelectedCode: (key: SearchFilterSectionKey, code: string) => void;
    reset: () => void;
  };
  state: {
    filterState: SearchFilterState;
    hasSelectedFilter: boolean;
    selectedFilterBySectionKey: SelectedFilterBySectionKey;
    selectedServiceItems: SelectedSearchFilterItem[];
  };
};

export default function useSearchFilterState(
  config: SearchFilterConfig,
): UseSearchFilterStateReturn {
  const [filterState, dispatch] = usePageFilter<
    SearchFilterState,
    SearchFilterAction
  >(
    config.filterStorageKey,
    INITIAL_SEARCH_FILTER_STATE,
    isSearchFilterState,
    searchFilterReducer,
    createReplaceAction,
  );
  const actions = useSearchFilterActions({
    dispatch,
    isAppliedPriceRangeClearedOnInput: false,
  });
  const {
    hasSelectedSectionFilter,
    selectedFilterBySectionKey,
    selectedServiceItems,
  } = useSearchFilterSelection(config, filterState);
  const hasSelectedFilter =
    hasSelectedSectionFilter ||
    hasAppliedRangeFilters({
      appliedPriceRange: filterState.appliedPriceRange,
    });

  const applyFilterState = useCallback(
    (nextFilterState: SearchFilterState): void => {
      dispatch({ type: 'replace', filterState: nextFilterState });
    },
    [dispatch],
  );

  const reset = useCallback((): void => {
    dispatch({ type: 'reset' });
  }, [dispatch]);

  const applyPriceRange = useCallback((): void => {
    if (!filterState.minimumPrice && !filterState.maximumPrice) {
      return;
    }

    dispatch({ type: 'applyPriceRange' });
  }, [dispatch, filterState.maximumPrice, filterState.minimumPrice]);

  const removePriceRange = useCallback((): void => {
    dispatch({ type: 'removePriceRange' });
  }, [dispatch]);

  const removeSelectedCode = useCallback(
    (key: SearchFilterSectionKey, code: string): void => {
      dispatch({ type: 'removeSelectedCode', key, code });
    },
    [dispatch],
  );

  return {
    actions,
    commands: {
      applyFilterState,
      applyPriceRange,
      removePriceRange,
      removeSelectedCode,
      reset,
    },
    state: {
      filterState,
      hasSelectedFilter,
      selectedFilterBySectionKey,
      selectedServiceItems,
    },
  };
}
