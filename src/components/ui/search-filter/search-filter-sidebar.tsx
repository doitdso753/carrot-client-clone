import type { ReactNode } from 'react';
import SearchFilterFields from '@/components/ui/search-filter/search-filter-fields.tsx';
import useRegionLocator from '@/hooks/location/use-region-locator.ts';
import useInitialFilterSelection from '@/hooks/search-filter/use-initial-filter-selection.ts';
import useSearchFilterState from '@/hooks/search-filter/use-search-filter-state.ts';
import {
  SEARCH_FILTER_CONFIGS,
  type InitialFilterCodeMap,
  type SearchFilterSectionKey,
  type SearchFilterChangeHandlers,
  type SearchFilterVariant,
  type SearchFilterViewModel,
} from '@/types/search-filter';

type SearchFilterSidebarProps = {
  initialFilterCodes?: InitialFilterCodeMap;
  region: string;
  sectionKeys: readonly SearchFilterSectionKey[];
  variant: SearchFilterVariant;
  onSectionOptionSelect?: SearchFilterChangeHandlers['onSectionOptionSelect'];
};

export default function SearchFilterSidebar({
  initialFilterCodes,
  region,
  sectionKeys,
  variant,
  onSectionOptionSelect,
}: SearchFilterSidebarProps): ReactNode {
  const baseConfig = SEARCH_FILTER_CONFIGS[variant];
  const config = {
    ...baseConfig,
    sections: baseConfig.sections.filter((section) =>
      sectionKeys.includes(section.key),
    ),
  };
  const {
    actions,
    commands: { applyPriceRange },
    state: { filterState, selectedFilterBySectionKey },
  } = useSearchFilterState(config);
  const { geolocation, regionPopup } = useRegionLocator();

  useInitialFilterSelection({
    actions,
    initialFilterCodes,
  });

  const handleSectionApply = (key: SearchFilterSectionKey): void => {
    if (key === 'price') {
      applyPriceRange();
    }
  };
  const handleSectionOptionSelect: SearchFilterChangeHandlers['onSectionOptionSelect'] =
    (key, optionCode): void => {
      actions.onSectionOptionSelect(key, optionCode);
      onSectionOptionSelect?.(key, optionCode);
    };
  const model: SearchFilterViewModel = {
    actions: {
      ...actions,
      onSectionOptionSelect: handleSectionOptionSelect,
    },
    config,
    filterState,
    isCurrentLocationLoading: geolocation.isLoading,
    region,
    selectedFilterBySectionKey,
    onCurrentLocationRequest: geolocation.request,
    onRegionOpen: regionPopup.open,
    onSectionApply: handleSectionApply,
  };

  return (
    <aside className="filter-aside search-filter-aside">
      <SearchFilterFields model={model} variant="aside" />
    </aside>
  );
}
