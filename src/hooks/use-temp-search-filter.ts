import { useCallback, useState } from 'react';
import useSearchFilterActions, {
  type SearchFilterChangeActions,
} from '@/hooks/use-search-filter-actions.ts';
import {
  getSelectedFilterBySectionKey,
  hasSelectedSectionFilters,
} from '@/lib/search-filter-summary-utils.ts';
import type {
  SearchFilterConfig,
  SearchFilterSectionKey,
  SearchFilterSectionSelection,
} from '@/types/search-filter-configs.ts';
import {
  INITIAL_SEARCH_FILTER_STATE,
  type SearchFilterState,
} from '@/types/search-filter-state.ts';

type UseTempSearchFilterOptions = {
  config: SearchFilterConfig;
  filterState: SearchFilterState;
  onApply: (filterState: SearchFilterState) => void;
};

type UseTempSearchFilterReturn = {
  actions: SearchFilterChangeActions;
  filterState: SearchFilterState;
  hasSelectedFilter: boolean;
  selectedFilterBySectionKey: Partial<
    Record<SearchFilterSectionKey, SearchFilterSectionSelection>
  >;
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
  const [tempFilterState, setTempFilterState] = useState<SearchFilterState>(
    INITIAL_SEARCH_FILTER_STATE,
  );
  const actions = useSearchFilterActions({
    isAppliedPriceRangeClearedOnInput: true,
    setFilterState: setTempFilterState,
  });
  const selectedFilterBySectionKey = getSelectedFilterBySectionKey(
    config.sections,
    tempFilterState,
  );
  const hasSelectedFilter =
    hasSelectedSectionFilters(selectedFilterBySectionKey) ||
    Boolean(tempFilterState.selectedPrice) ||
    Boolean(tempFilterState.minimumPrice) ||
    Boolean(tempFilterState.maximumPrice);

  const open = useCallback((): void => {
    setTempFilterState(filterState);
  }, [filterState]);

  const reset = useCallback((): void => {
    setTempFilterState(INITIAL_SEARCH_FILTER_STATE);
  }, []);

  const applyPriceRange = useCallback((): void => {
    setTempFilterState((currentState) => ({
      ...currentState,
      appliedPriceRange:
        currentState.minimumPrice || currentState.maximumPrice
          ? {
              maximumPrice: currentState.maximumPrice,
              minimumPrice: currentState.minimumPrice,
            }
          : null,
    }));
  }, []);

  const apply = useCallback((): void => {
    const hasDirectPriceRange =
      Boolean(tempFilterState.minimumPrice) ||
      Boolean(tempFilterState.maximumPrice);

    onApply({
      ...tempFilterState,
      appliedPriceRange:
        tempFilterState.appliedPriceRange || !hasDirectPriceRange
          ? tempFilterState.appliedPriceRange
          : {
              maximumPrice: tempFilterState.maximumPrice,
              minimumPrice: tempFilterState.minimumPrice,
            },
    });
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
