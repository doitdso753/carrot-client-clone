import type { ReactNode } from 'react';
import { FilterIcon } from '@/assets/icons';
import CommonPopup from '@/components/ui/common-popup.tsx';
import RegionSettingPopup from '@/components/ui/region-setting-popup.tsx';
import SearchFilterFields from '@/components/ui/search-filter/search-filter-fields.tsx';
import SearchFilterHeader from '@/components/ui/search-filter/search-filter-header.tsx';
import SearchFilterRegion from '@/components/ui/search-filter/search-filter-region.tsx';
import SearchFilterToolbar from '@/components/ui/search-filter/search-filter-toolbar.tsx';
import SelectedFilterSummary from '@/components/ui/search-filter/selected-filter-summary.tsx';
import useGeolocation from '@/hooks/use-geolocation.ts';
import usePopup from '@/hooks/use-popup.ts';
import useSearchFilterState from '@/hooks/use-search-filter-state.ts';
import useTempSearchFilter from '@/hooks/use-temp-search-filter.ts';
import {
  SEARCH_FILTER_CONFIGS,
  type SearchFilterSectionKey,
  type SearchFilterVariant,
  type SearchFilterViewType,
  type SelectedSearchFilterItem,
} from '@/types/search-filter-configs.ts';
import type { SearchFilterViewModel } from '@/types/search-filter-view-model.ts';

type SearchFilterProps = {
  region: string;
  variant: SearchFilterVariant;
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

type CommonSearchFilterViewModel = Pick<
  SearchFilterViewModel,
  | 'config'
  | 'isCurrentLocationLoading'
  | 'onCurrentLocationRequest'
  | 'onRegionOpen'
  | 'region'
>;

type CreateSearchFilterViewModelOptions = {
  actions: SearchFilterViewModel['actions'];
  filterState: SearchFilterViewModel['filterState'];
  selectedFilterBySectionKey: SearchFilterViewModel['selectedFilterBySectionKey'];
  onSectionApply: (key: SearchFilterSectionKey) => void;
};

function createSearchFilterViewModel(
  commonValue: CommonSearchFilterViewModel,
  {
    actions,
    filterState,
    selectedFilterBySectionKey,
    onSectionApply,
  }: CreateSearchFilterViewModelOptions,
): SearchFilterViewModel {
  return {
    ...commonValue,
    actions,
    filterState,
    selectedFilterBySectionKey,
    onSectionApply,
  };
}

export default function SearchFilter({
  region,
  variant,
}: SearchFilterProps): ReactNode {
  const config = SEARCH_FILTER_CONFIGS[variant];
  const {
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
  } = useSearchFilterState(config);
  const temp = useTempSearchFilter({
    config,
    filterState,
    onApply: applyFilterState,
  });
  const geolocation = useGeolocation();
  const {
    isOpen: isRegionPopupOpen,
    openPopup: openRegionPopup,
    closePopup: closeRegionPopup,
  } = usePopup();
  const {
    isOpen: isFilterPopupOpen,
    openPopup: openFilterPopup,
    closePopup: closeFilterPopup,
  } = usePopup();

  const handleFilterPopupToggle = (): void => {
    if (isFilterPopupOpen) {
      closeFilterPopup();
      return;
    }

    temp.open();
    openFilterPopup();
  };

  const handleSectionApply = (key: SearchFilterSectionKey): void => {
    const section = config.sections.find(
      (currentSection) => currentSection.key === key,
    );

    if (section?.type === 'range') {
      closeFilterPopup();
      return;
    }

    if (key === 'price') {
      applyPriceRange();
      closeFilterPopup();
    }
  };

  const handleTempSectionApply = (key: SearchFilterSectionKey): void => {
    if (key === 'price') {
      temp.applyPriceRange();
    }
  };

  const handleTempApply = (): void => {
    temp.apply();
    closeFilterPopup();
  };

  const commonViewModel: CommonSearchFilterViewModel = {
    config,
    isCurrentLocationLoading: geolocation.isLoading,
    region,
    onCurrentLocationRequest: geolocation.request,
    onRegionOpen: openRegionPopup,
  };
  const asideViewModel = createSearchFilterViewModel(commonViewModel, {
    actions,
    filterState,
    selectedFilterBySectionKey,
    onSectionApply: handleSectionApply,
  });
  const bottomSheetViewModel = createSearchFilterViewModel(commonViewModel, {
    actions: temp.actions,
    filterState: temp.filterState,
    selectedFilterBySectionKey: temp.selectedFilterBySectionKey,
    onSectionApply: handleTempSectionApply,
  });
  const filterView = SEARCH_FILTER_VIEW_RENDERERS[config.viewType]({
    model: asideViewModel,
    selectedServiceItems,
    onReset: reset,
  });

  return (
    <>
      <div
        className={`filter-chip search-filter-toolbar ${
          hasSelectedFilter ? '' : 'is-summary-disabled'
        }`}
      >
        <SearchFilterRegion
          isCurrentLocationLoading={geolocation.isLoading}
          region={region}
          onCurrentLocationRequest={geolocation.request}
          onRegionOpen={openRegionPopup}
        />
        <button
          aria-expanded={isFilterPopupOpen}
          className="search-filter-open-button"
          type="button"
          onClick={handleFilterPopupToggle}
        >
          <FilterIcon />
          필터 {selectedServiceItems.length > 0 && selectedServiceItems.length}
        </button>
        {hasSelectedFilter && (
          <SelectedFilterSummary
            appliedPriceRange={filterState.appliedPriceRange}
            selectedServiceItems={selectedServiceItems}
            onRemovePriceRange={removePriceRange}
            onRemoveSelectedCode={removeSelectedCode}
          />
        )}
      </div>

      {filterView}

      <CommonPopup
        footer={
          <>
            <button type="button" onClick={temp.reset}>
              전체 해제
            </button>
            <button
              className={`search-filter-footer-apply-button ${
                temp.hasSelectedFilter ? 'has-filter' : ''
              }`}
              type="button"
              onClick={handleTempApply}
            >
              필터 적용
            </button>
          </>
        }
        isOpen={isFilterPopupOpen}
        title={config.popupTitle}
        variant="bottom-sheet"
        onClose={closeFilterPopup}
      >
        <div className="search-filter-popup-fields">
          <SearchFilterFields
            model={bottomSheetViewModel}
            variant="bottomSheet"
          />
        </div>
      </CommonPopup>

      <RegionSettingPopup
        initialLocationErrorCode={geolocation.errorCode}
        isOpen={isRegionPopupOpen}
        key={`${geolocation.status}-${geolocation.errorCode ?? 'none'}`}
        onClose={closeRegionPopup}
      />
    </>
  );
}
