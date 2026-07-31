import { useEffect, type ReactNode } from 'react';
import { FilterIcon } from '@/assets/icons';
import CommonPopup from '@/components/ui/common-popup.tsx';
import RegionSettingPopup from '@/components/ui/region-setting-popup.tsx';
import {
  SearchFilterProvider,
  type SearchFilterContextValue,
} from '@/components/ui/search-filter/search-filter-context.tsx';
import SearchFilterFields from '@/components/ui/search-filter/search-filter-fields.tsx';
import SearchFilterHeader from '@/components/ui/search-filter/search-filter-header.tsx';
import SearchFilterRegion from '@/components/ui/search-filter/search-filter-region.tsx';
import SelectedFilterSummary from '@/components/ui/search-filter/selected-filter-summary.tsx';
import useCurrentLocationRequest from '@/hooks/use-current-location-request.ts';
import usePageFilter from '@/hooks/use-page-filter.ts';
import usePopup from '@/hooks/use-popup.ts';
import {
  SEARCH_FILTER_CONFIGS,
  type SearchFilterConfig,
  type SearchFilterFieldName,
  type SearchFilterSectionKey,
  type SearchFilterVariant,
} from '@/types/search-filter-configs.ts';
import {
  getSelectedFilterBySectionKey,
  getSelectedServiceItems,
  hasAppliedRangeFilters,
  hasSelectedSectionFilters,
} from '@/lib/search-filter-summary-utils.ts';

type SearchFilterProps = {
  region: string;
  variant: SearchFilterVariant;
};

type ServiceSearchFilterProps = {
  config: SearchFilterConfig;
  region: string;
};

type SearchFilterPriceInputFieldCode = 'maximumPrice' | 'minimumPrice';

type SearchFilterState = {
  appliedPriceRange: {
    maximumPrice: string;
    minimumPrice: string;
  } | null;
  maximumPrice: string;
  minimumPrice: string;
  selectedCodesByKey: Partial<Record<SearchFilterSectionKey, string[]>>;
  selectedPrice: string;
};

const INITIAL_SEARCH_FILTER_STATE: SearchFilterState = {
  appliedPriceRange: null,
  maximumPrice: '',
  minimumPrice: '',
  selectedCodesByKey: {},
  selectedPrice: '',
};

function isSearchFilterPriceInputFieldCode(
  field: SearchFilterFieldName,
): field is SearchFilterPriceInputFieldCode {
  return field === 'maximumPrice' || field === 'minimumPrice';
}

function isSearchFilterState(value: unknown): value is SearchFilterState {
  return (
    typeof value === 'object' &&
    value !== null &&
    'appliedPriceRange' in value &&
    'maximumPrice' in value &&
    'minimumPrice' in value &&
    'selectedCodesByKey' in value &&
    'selectedPrice' in value &&
    (value.appliedPriceRange === null ||
      (typeof value.appliedPriceRange === 'object' &&
        'maximumPrice' in value.appliedPriceRange &&
        'minimumPrice' in value.appliedPriceRange &&
        typeof value.appliedPriceRange.maximumPrice === 'string' &&
        typeof value.appliedPriceRange.minimumPrice === 'string')) &&
    typeof value.maximumPrice === 'string' &&
    typeof value.minimumPrice === 'string' &&
    typeof value.selectedCodesByKey === 'object' &&
    value.selectedCodesByKey !== null &&
    Object.values(value.selectedCodesByKey).every(
      (codes) =>
        Array.isArray(codes) && codes.every((code) => typeof code === 'string'),
    ) &&
    typeof value.selectedPrice === 'string'
  );
}

function toggleCode(codes: string[], code: string): string[] {
  return codes.includes(code)
    ? codes.filter((currentCode) => currentCode !== code)
    : [...codes, code];
}

function ServiceSearchFilter({
  config,
  region,
}: ServiceSearchFilterProps): ReactNode {
  const [filterState, setFilterState] = usePageFilter<SearchFilterState>(
    config.filterStorageKey,
    INITIAL_SEARCH_FILTER_STATE,
    isSearchFilterState,
  );
  const {
    appliedPriceRange,
    maximumPrice,
    minimumPrice,
    selectedCodesByKey,
    selectedPrice,
  } = filterState;
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

  // 카테고리, 옵션처럼 여러 값을 갖는 필터 선택값 변경
  const handleCodesChange = (
    key: SearchFilterSectionKey,
    codes: string[],
  ): void => {
    setFilterState((currentState) => ({
      ...currentState,
      selectedCodesByKey: {
        ...currentState.selectedCodesByKey,
        [key]: codes,
      },
    }));
  };

  // section key와 item code를 기준으로 checkbox 선택값 토글
  const handleSectionCodeToggle = (
    key: SearchFilterSectionKey,
    code: string,
  ): void => {
    handleCodesChange(key, toggleCode(selectedCodesByKey[key] ?? [], code));
  };

  // section key를 기준으로 radio 선택값 변경
  const handleSectionValueChange = (
    key: SearchFilterSectionKey,
    value: string,
  ): void => {
    handleCodesChange(key, [value]);
  };

  // 가격 프리셋 선택 시 가격 범위 즉시 적용
  const handleSelectedPriceChange = (value: string): void => {
    const maximumPriceValue = value.replace(/\D/g, '');

    setFilterState((currentState) => ({
      ...currentState,
      appliedPriceRange: maximumPriceValue
        ? { maximumPrice: maximumPriceValue, minimumPrice: '0' }
        : null,
      selectedPrice: value,
      maximumPrice: maximumPriceValue,
      minimumPrice: maximumPriceValue ? '0' : '',
    }));
  };

  // 가격 직접 입력값 변경
  const handlePriceInputChange = (
    code: SearchFilterPriceInputFieldCode,
    value: string,
  ): void => {
    setFilterState((currentState) => ({
      ...currentState,
      [code]: value,
      selectedPrice: '',
    }));
  };

  // 전체 필터 상태 초기화
  const handleReset = (): void => {
    setFilterState(INITIAL_SEARCH_FILTER_STATE);
  };

  // 현재 가격 입력값을 적용 필터로 확정
  const handleApplyPriceRange = (): void => {
    if (!minimumPrice && !maximumPrice) {
      return;
    }

    setFilterState((currentState) => ({
      ...currentState,
      appliedPriceRange: { maximumPrice, minimumPrice },
    }));
    closeFilterPopup();
  };

  // section key를 기준으로 적용 액션 실행
  const handleSectionApply = (key: SearchFilterSectionKey): void => {
    const applyHandlerByKey: Partial<
      Record<SearchFilterSectionKey, () => void>
    > = {
      price: handleApplyPriceRange,
    };

    applyHandlerByKey[key]?.();
  };

  // section 내부 입력 필드 변경
  const handleSectionFieldChange = (
    _key: SearchFilterSectionKey,
    field: SearchFilterFieldName,
    value: string,
  ): void => {
    if (field === 'selectedPrice') {
      handleSelectedPriceChange(value);
      return;
    }

    if (isSearchFilterPriceInputFieldCode(field)) {
      handlePriceInputChange(field, value);
    }
  };

  // 적용된 가격 범위 필터 제거
  const handleRemovePriceRange = (): void => {
    setFilterState((currentState) => ({
      ...currentState,
      appliedPriceRange: null,
      maximumPrice: '',
      minimumPrice: '',
      selectedPrice: '',
    }));
  };

  // section key와 code를 기준으로 선택한 필터 제거
  const handleRemoveSelectedCode = (
    key: SearchFilterSectionKey,
    code: string,
  ): void => {
    setFilterState((currentState) => ({
      ...currentState,
      selectedCodesByKey: {
        ...currentState.selectedCodesByKey,
        [key]: (currentState.selectedCodesByKey[key] ?? []).filter(
          (currentCode) => currentCode !== code,
        ),
      },
    }));
  };

  const selectedFilterBySectionKey = getSelectedFilterBySectionKey(
    config.sections,
    filterState,
  );
  const selectedServiceItems = getSelectedServiceItems({
    config,
    selectedFilterBySectionKey,
  });
  const hasSelectedFilter =
    hasSelectedSectionFilters(selectedFilterBySectionKey) ||
    hasAppliedRangeFilters({ appliedPriceRange });

  const searchFilterContextValue: SearchFilterContextValue = {
    config,
    isCurrentLocationLoading,
    maximumPrice,
    minimumPrice,
    region,
    selectedFilterBySectionKey,
    selectedPrice,
    onCurrentLocationRequest: requestCurrentLocation,
    onRegionOpen: openRegionPopup,
    onSectionApply: handleSectionApply,
    onSectionCodeToggle: handleSectionCodeToggle,
    onSectionCodesChange: handleCodesChange,
    onSectionFieldChange: handleSectionFieldChange,
    onSectionValueChange: handleSectionValueChange,
  };

  const filterFields = (
    <SearchFilterProvider value={searchFilterContextValue}>
      <SearchFilterFields />
    </SearchFilterProvider>
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
          onClick={openFilterPopup}
        >
          <FilterIcon />
          필터 {selectedServiceItems.length > 0 && selectedServiceItems.length}
        </button>
        {hasSelectedFilter && (
          <SelectedFilterSummary
            appliedPriceRange={appliedPriceRange}
            selectedServiceItems={selectedServiceItems}
            onRemovePriceRange={handleRemovePriceRange}
            onRemoveSelectedCode={handleRemoveSelectedCode}
          />
        )}
      </div>

      <aside className="filter-aside search-filter-aside">
        <SearchFilterHeader onReset={handleReset} />
        {filterFields}
      </aside>

      <CommonPopup
        footer={
          <button type="button" onClick={handleReset}>
            전체 해제
          </button>
        }
        isOpen={isFilterPopupOpen}
        title={config.popupTitle}
        variant="bottom-sheet"
        onClose={closeFilterPopup}
      >
        <div className="search-filter-popup-fields">{filterFields}</div>
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
