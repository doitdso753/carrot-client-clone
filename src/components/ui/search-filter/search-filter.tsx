import type { ReactNode } from 'react';
import { FilterIcon } from '@/assets/icons';
import CommonPopup from '@/components/ui/common-popup.tsx';
import RegionSettingPopup from '@/components/ui/region-setting-popup.tsx';
import SearchFilterFields from '@/components/ui/search-filter/search-filter-fields.tsx';
import SearchFilterFooter from '@/components/ui/search-filter/search-filter-footer.tsx';
import SearchFilterHeader from '@/components/ui/search-filter/search-filter-header.tsx';
import SearchFilterRegion from '@/components/ui/search-filter/search-filter-region.tsx';
import SearchFilterToolbar from '@/components/ui/search-filter/toolbar/search-filter-toolbar.tsx';
import SelectedFilterSummary from '@/components/ui/search-filter/selected-filter-summary.tsx';
import useSearchFilterController from '@/hooks/search-filter/use-search-filter-controller.ts';
import {
  type InitialFilterCodeMap,
  type SearchFilterState,
  type SearchFilterVariant,
  type SearchFilterViewModel,
  type SearchFilterViewType,
  type SelectedSearchFilterItem,
} from '@/types/search-filter';

type SearchFilterProps = {
  region: string;
  initialFilterCodes?: InitialFilterCodeMap;
  variant: SearchFilterVariant;
  onFilterStateChange?: (filterState: SearchFilterState) => void;
};

type SearchFilterViewProps = {
  model: SearchFilterViewModel;
  selectedServiceItems: SelectedSearchFilterItem[];
  onReset: () => void;
};

type SearchFilterViewRenderer = (props: SearchFilterViewProps) => ReactNode;

const SEARCH_FILTER_VIEW_RENDERERS: Record<
  SearchFilterViewType,
  SearchFilterViewRenderer
> = {
  aside: ({ model, onReset }) => (
    <aside className="filter-aside search-filter-aside">
      <SearchFilterHeader onReset={onReset} />
      <SearchFilterFields model={model} variant="aside" />
    </aside>
  ),
  toolbar: ({ model, selectedServiceItems, onReset }) => (
    <div className="search-toolbar">
      <SearchFilterToolbar.Root
        model={model}
        selectedServiceItems={selectedServiceItems}
        onReset={onReset}
      >
        <SearchFilterToolbar.List />
      </SearchFilterToolbar.Root>
    </div>
  ),
};

export default function SearchFilter({
  initialFilterCodes,
  region,
  variant,
  onFilterStateChange,
}: SearchFilterProps): ReactNode {
  const {
    asideModel,
    bottomSheetModel,
    config,
    filter: {
      hasSelectedFilter,
      selectedServiceItems,
      state: filterState,
      onRemovePriceRange,
      onRemoveSelectedCode,
      onReset,
    },
    filterPopup,
    regionLocator,
  } = useSearchFilterController({
    initialFilterCodes,
    region,
    variant,
    onFilterStateChange,
  });
  const filterView = SEARCH_FILTER_VIEW_RENDERERS[config.viewType]({
    model: asideModel,
    selectedServiceItems,
    onReset,
  });
  const bottomSheetFooter = filterPopup.footer ? (
    <SearchFilterFooter
      hasSelectedFilter={filterPopup.footer.hasSelectedFilter}
      onApply={filterPopup.footer.onApply}
      onReset={filterPopup.footer.onReset}
    />
  ) : undefined;

  return (
    <>
      <div
        className={`filter-chip search-filter-toolbar ${
          hasSelectedFilter ? '' : 'is-summary-disabled'
        }`}
      >
        <SearchFilterRegion
          isCurrentLocationLoading={regionLocator.isCurrentLocationLoading}
          region={region}
          onCurrentLocationRequest={regionLocator.onCurrentLocationRequest}
          onRegionOpen={regionLocator.popup.onOpen}
        />
        <button
          aria-expanded={filterPopup.isOpen}
          className="search-filter-open-button"
          type="button"
          onClick={filterPopup.onToggle}
        >
          <FilterIcon />
          필터 {selectedServiceItems.length > 0 && selectedServiceItems.length}
        </button>
        {hasSelectedFilter && (
          <SelectedFilterSummary
            appliedPriceRange={filterState.appliedPriceRange}
            selectedServiceItems={selectedServiceItems}
            onRemovePriceRange={onRemovePriceRange}
            onRemoveSelectedCode={onRemoveSelectedCode}
          />
        )}
      </div>

      {filterView}

      <CommonPopup
        footer={bottomSheetFooter}
        isOpen={filterPopup.isOpen}
        title={config.popupTitle}
        variant="bottom-sheet"
        onClose={filterPopup.onClose}
      >
        <div className="search-filter-popup-fields">
          <SearchFilterFields model={bottomSheetModel} variant="bottomSheet" />
        </div>
      </CommonPopup>

      <RegionSettingPopup
        initialLocationErrorCode={regionLocator.errorCode}
        isOpen={regionLocator.popup.isOpen}
        key={`${regionLocator.status}-${regionLocator.errorCode ?? 'none'}`}
        onClose={regionLocator.popup.onClose}
      />
    </>
  );
}
