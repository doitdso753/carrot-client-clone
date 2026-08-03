import type {
  SearchFilterConfig,
  SearchFilterSectionKey,
  SelectedFilterBySectionKey,
} from '@/types/search-filter-configs.ts';
import type {
  SearchFilterChangeHandlers,
  SearchFilterState,
} from '@/types/search-filter-state.ts';

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
