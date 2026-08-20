import type { ReactNode } from 'react';
import { FilterIcon } from '@/assets/icons';
import CommonPopup from '@/components/ui/common-popup.tsx';
import RegionSettingPopup from '@/components/ui/region-setting-popup.tsx';
import SearchFilterFields from '@/components/ui/search-filter/search-filter-fields.tsx';
import SearchFilterFooter from '@/components/ui/search-filter/search-filter-footer.tsx';
import SearchFilterHeader from '@/components/ui/search-filter/search-filter-header.tsx';
import SearchFilterRegion from '@/components/ui/search-filter/search-filter-region.tsx';
import SearchFilterToolbar from '@/components/ui/search-filter/search-filter-toolbar.tsx';
import SelectedFilterSummary from '@/components/ui/search-filter/selected-filter-summary.tsx';
import useRegionLocator from '@/hooks/location/use-region-locator.ts';
import usePopup from '@/hooks/ui/use-popup.ts';
import useInitialFilterSelection from '@/hooks/search-filter/use-initial-filter-selection.ts';
import useSearchFilterState from '@/hooks/search-filter/use-search-filter-state.ts';
import useTempSearchFilter from '@/hooks/search-filter/use-temp-search-filter.ts';
import {
  SEARCH_FILTER_CONFIGS,
  type InitialFilterCodeMap,
  type SearchFilterSectionKey,
  type SearchFilterVariant,
  type SearchFilterViewType,
  type SelectedSearchFilterItem,
} from '@/types/search-filter-configs.ts';
import type { SearchFilterViewModel } from '@/types/search-filter-view-model.ts';

type SearchFilterProps = {
  region: string;
  initialFilterCodes?: InitialFilterCodeMap;
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
  initialFilterCodes,
  region,
  variant,
}: SearchFilterProps): ReactNode {
  const config = SEARCH_FILTER_CONFIGS[variant];
  const isInstantApply = config.bottomSheetApplyMode === 'instant';
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
  useInitialFilterSelection({
    actions,
    initialFilterCodes,
  });

  const temp = useTempSearchFilter({
    config,
    filterState,
    onApply: applyFilterState,
  });
  const { geolocation, regionPopup } = useRegionLocator();
  const {
    isOpen: isFilterPopupOpen,
    openPopup: openFilterPopup,
    closePopup: closeFilterPopup,
  } = usePopup();

  // 필터 팝업 열림 상태 전환
  const handleFilterPopupToggle = (): void => {
    if (isFilterPopupOpen) {
      closeFilterPopup();
      return;
    }

    if (!isInstantApply) {
      temp.open();
    }
    openFilterPopup();
  };

  // 실제 필터 범위 적용
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

  // 임시 가격 범위 적용
  const handleTempSectionApply = (key: SearchFilterSectionKey): void => {
    if (key === 'price') {
      temp.applyPriceRange();
    }
  };

  // 임시 필터 전체 적용
  const handleTempApply = (): void => {
    temp.apply();
    closeFilterPopup();
  };

  const commonViewModel: CommonSearchFilterViewModel = {
    config,
    isCurrentLocationLoading: geolocation.isLoading,
    region,
    onCurrentLocationRequest: geolocation.request,
    onRegionOpen: regionPopup.open,
  };
  const asideViewModel = createSearchFilterViewModel(commonViewModel, {
    actions,
    filterState,
    selectedFilterBySectionKey,
    onSectionApply: handleSectionApply,
  });

  // 즉시 적용 후 팝업 종료
  const instantApplyActions = {
    ...actions,
    onSectionOptionSelect: (
      key: SearchFilterSectionKey,
      code: string,
    ): void => {
      actions.onSectionOptionSelect(key, code);
      closeFilterPopup();
    },
    onSectionOptionToggle: (
      key: SearchFilterSectionKey,
      code: string,
    ): void => {
      actions.onSectionOptionToggle(key, code);
      closeFilterPopup();
    },
    onSectionSelectionChange: (
      key: SearchFilterSectionKey,
      codes: string[],
    ): void => {
      actions.onSectionSelectionChange(key, codes);
      closeFilterPopup();
    },
  };
  // 적용 방식별 bottom sheet 모델 구성
  const bottomSheetModelOptions = isInstantApply
    ? {
        actions: instantApplyActions,
        filterState,
        selectedFilterBySectionKey,
        onSectionApply: handleSectionApply,
      }
    : {
        actions: temp.actions,
        filterState: temp.filterState,
        selectedFilterBySectionKey: temp.selectedFilterBySectionKey,
        onSectionApply: handleTempSectionApply,
      };
  const bottomSheetViewModel = createSearchFilterViewModel(
    commonViewModel,
    bottomSheetModelOptions,
  );
  const filterView = SEARCH_FILTER_VIEW_RENDERERS[config.viewType]({
    model: asideViewModel,
    selectedServiceItems,
    onReset: reset,
  });
  // 확인형 bottom sheet 전용 footer
  const bottomSheetFooter = isInstantApply ? undefined : (
    <SearchFilterFooter
      hasSelectedFilter={temp.hasSelectedFilter}
      onApply={handleTempApply}
      onReset={temp.reset}
    />
  );

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
          onRegionOpen={regionPopup.open}
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
        footer={bottomSheetFooter}
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
        isOpen={regionPopup.isOpen}
        key={`${geolocation.status}-${geolocation.errorCode ?? 'none'}`}
        onClose={regionPopup.close}
      />
    </>
  );
}
