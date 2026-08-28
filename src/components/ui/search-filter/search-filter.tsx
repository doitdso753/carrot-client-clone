import type { ReactNode } from 'react';
import { useSearchParams } from 'react-router';
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

// 서비스별 검색 필터 UI 구성
export default function SearchFilter({
  initialFilterCodes,
  region,
  variant,
  onFilterStateChange,
}: SearchFilterProps): ReactNode {
  const [searchParams, setSearchParams] = useSearchParams();
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

  // URL 검색 조건 초기화
  const resetSearchParams = (): void => {
    const nextSearchParams = new URLSearchParams(searchParams);

    nextSearchParams.delete('search');
    nextSearchParams.delete('category');
    setSearchParams(nextSearchParams, { replace: true });
  };

  // 적용 필터와 URL 검색 조건 초기화
  const handleReset = (): void => {
    onReset();
    resetSearchParams();
  };

  // Bottom sheet 임시 필터와 URL 검색 조건 초기화
  const handleBottomSheetReset = (): void => {
    filterPopup.footer?.onReset();
    resetSearchParams();
  };

  // 화면 유형별 필터 UI 생성
  const filterView = SEARCH_FILTER_VIEW_RENDERERS[config.viewType]({
    model: asideModel,
    selectedServiceItems,
    onReset: handleReset,
  });
  // Bottom sheet 필터 적용 영역 구성
  const bottomSheetFooter = filterPopup.footer ? (
    <SearchFilterFooter
      hasSelectedFilter={filterPopup.footer.hasSelectedFilter}
      onApply={filterPopup.footer.onApply}
      onReset={handleBottomSheetReset}
    />
  ) : undefined;

  return (
    <>
      {/* 모바일 필터 실행 및 선택 요약 영역 */}
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

      {/* 데스크톱 필터 영역 */}
      {filterView}

      {/* 모바일 필터 Bottom sheet */}
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

      {/* 지역 설정 팝업 */}
      <RegionSettingPopup
        initialLocationErrorCode={regionLocator.errorCode}
        isOpen={regionLocator.popup.isOpen}
        key={`${regionLocator.status}-${regionLocator.errorCode ?? 'none'}`}
        onClose={regionLocator.popup.onClose}
      />
    </>
  );
}
