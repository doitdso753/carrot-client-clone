import { useEffect, type ReactNode } from 'react';
import { FilterIcon } from '@/assets/icons';
import CommonPopup from '@/components/ui/common-popup.tsx';
import RegionSettingPopup from '@/components/ui/region-setting-popup.tsx';
import SearchFilterFields from '@/components/ui/search-filter/search-filter-fields.tsx';
import SearchFilterHeader from '@/components/ui/search-filter/search-filter-header.tsx';
import SearchFilterRegion from '@/components/ui/search-filter/search-filter-region.tsx';
import SelectedFilterSummary from '@/components/ui/search-filter/selected-filter-summary.tsx';
import useCurrentLocationRequest from '@/hooks/use-current-location-request.ts';
import usePopup from '@/hooks/use-popup.ts';
import useSearchFilterState from '@/hooks/use-search-filter-state.ts';
import useTempSearchFilter from '@/hooks/use-temp-search-filter.ts';
import {
  SEARCH_FILTER_CONFIGS,
  type SearchFilterConfig,
  type SearchFilterSectionKey,
  type SearchFilterVariant,
} from '@/types/search-filter-configs.ts';
import type { SearchFilterViewModel } from '@/types/search-filter-view-model.ts';

type SearchFilterProps = {
  region: string;
  variant: SearchFilterVariant;
};

type ServiceSearchFilterProps = {
  config: SearchFilterConfig;
  region: string;
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

function ServiceSearchFilter({
  config,
  region,
}: ServiceSearchFilterProps): ReactNode {
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
  const { locationErrorCode, locationRequestStatus, requestCurrentLocation } =
    useCurrentLocationRequest();
  const isCurrentLocationLoading = locationRequestStatus === 'requesting';

  useEffect(() => {
    if (locationRequestStatus === 'error' && locationErrorCode) {
      openRegionPopup();
    }
  }, [locationErrorCode, locationRequestStatus, openRegionPopup]);

  const handleFilterPopupOpen = (): void => {
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
    isCurrentLocationLoading,
    region,
    onCurrentLocationRequest: requestCurrentLocation,
    onRegionOpen: openRegionPopup,
  };
  const asideViewModel = createSearchFilterViewModel(
    commonViewModel,
    {
      actions,
      filterState,
      selectedFilterBySectionKey,
      onSectionApply: handleSectionApply,
    },
  );
  const bottomSheetViewModel = createSearchFilterViewModel(
    commonViewModel,
    {
      actions: temp.actions,
      filterState: temp.filterState,
      selectedFilterBySectionKey: temp.selectedFilterBySectionKey,
      onSectionApply: handleTempSectionApply,
    },
  );

  const asideFilterFields = (
    <SearchFilterFields model={asideViewModel} variant="aside" />
  );
  const bottomSheetFilterFields = (
    <SearchFilterFields
      model={bottomSheetViewModel}
      variant="bottomSheet"
    />
  );

  return (
    <>
      <div
        className={`filter-chip search-filter-responsive ${
          hasSelectedFilter ? '' : 'is-summary-disabled'
        }`}
      >
        <SearchFilterRegion
          isCurrentLocationLoading={isCurrentLocationLoading}
          region={region}
          onCurrentLocationRequest={requestCurrentLocation}
          onRegionOpen={openRegionPopup}
        />
        <button
          className="search-filter-open-button"
          type="button"
          onClick={handleFilterPopupOpen}
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

      <aside className="filter-aside search-filter-aside">
        <SearchFilterHeader onReset={reset} />
        {asideFilterFields}
      </aside>

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
          {bottomSheetFilterFields}
        </div>
      </CommonPopup>

      <RegionSettingPopup
        initialLocationErrorCode={locationErrorCode}
        isOpen={isRegionPopupOpen}
        key={`${locationRequestStatus}-${locationErrorCode ?? 'none'}`}
        onClose={closeRegionPopup}
      />
    </>
  );
}

export default function SearchFilter(props: SearchFilterProps): ReactNode {
  const config = SEARCH_FILTER_CONFIGS[props.variant];

  return <ServiceSearchFilter config={config} region={props.region} />;
}
