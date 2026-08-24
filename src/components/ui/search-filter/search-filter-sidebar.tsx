import type { ReactNode } from 'react';
import SearchFilterFields from '@/components/ui/search-filter/search-filter-fields.tsx';
import useRegionLocator from '@/hooks/location/use-region-locator.ts';
import useInitialFilterSelection from '@/hooks/search-filter/use-initial-filter-selection.ts';
import useSearchFilterState from '@/hooks/search-filter/use-search-filter-state.ts';
import {
  SEARCH_FILTER_CONFIGS,
  type InitialFilterCodeMap,
  type SearchFilterSectionKey,
  type SearchFilterVariant,
  type SearchFilterViewModel,
} from '@/types/search-filter';

type SearchFilterSidebarProps = {
  initialFilterCodes?: InitialFilterCodeMap;
  region: string;
  sectionKeys: readonly SearchFilterSectionKey[];
  variant: SearchFilterVariant;
};

export default function SearchFilterSidebar({
  initialFilterCodes,
  region,
  sectionKeys,
  variant,
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
  const model: SearchFilterViewModel = {
    actions,
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
