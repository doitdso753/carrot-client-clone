import type {
  SearchFilterConfig,
  SearchFilterSectionKey,
  SelectedFilterBySectionKey,
} from './search-filter-configs.ts';
import type {
  SearchFilterChangeHandlers,
  SearchFilterState,
} from './search-filter-state.ts';

export type SearchFilterViewModel = {
  actions: SearchFilterChangeHandlers;
  config: SearchFilterConfig;
  filterState: SearchFilterState;
  isCurrentLocationLoading: boolean;
  region: string;
  selectedFilterBySectionKey: SelectedFilterBySectionKey;
  onCurrentLocationRequest: () => void;
  onRegionOpen: () => void;
  onSectionApply: (key: SearchFilterSectionKey) => void;
};
