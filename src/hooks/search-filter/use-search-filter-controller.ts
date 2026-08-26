import { useEffect } from 'react';
import useRegionLocator from '@/hooks/location/use-region-locator.ts';
import useInitialFilterSelection from '@/hooks/search-filter/use-initial-filter-selection.ts';
import useSearchFilterState from '@/hooks/search-filter/use-search-filter-state.ts';
import useSearchFilterViewModel from '@/hooks/search-filter/use-search-filter-view-model.ts';
import useTempSearchFilter from '@/hooks/search-filter/use-temp-search-filter.ts';
import usePopup from '@/hooks/ui/use-popup.ts';
import type { GeolocationState } from '@/types/geolocation.ts';
import {
  SEARCH_FILTER_CONFIGS,
  type InitialFilterCodeMap,
  type SearchFilterChangeHandlers,
  type SearchFilterSectionKey,
  type SearchFilterState,
  type SearchFilterVariant,
  type SearchFilterViewModel,
  type SelectedFilterBySectionKey,
  type SelectedSearchFilterItem,
} from '@/types/search-filter';

// 검색 필터 구성에 필요한 입력 정보
type UseSearchFilterControllerOptions = {
  initialFilterCodes?: InitialFilterCodeMap;
  region: string;
  variant: SearchFilterVariant;
  onFilterStateChange?: (filterState: SearchFilterState) => void;
};

// 화면에 전달할 검색 필터 상태와 기능
type UseSearchFilterControllerReturn = {
  asideModel: SearchFilterViewModel;
  bottomSheetModel: SearchFilterViewModel;
  config: SearchFilterViewModel['config'];
  filter: {
    hasSelectedFilter: boolean;
    selectedServiceItems: SelectedSearchFilterItem[];
    state: SearchFilterState;
    onRemovePriceRange: () => void;
    onRemoveSelectedCode: (key: SearchFilterSectionKey, code: string) => void;
    onReset: () => void;
  };
  filterPopup: {
    footer:
      | {
          hasSelectedFilter: boolean;
          onApply: () => void;
          onReset: () => void;
        }
      | undefined;
    isOpen: boolean;
    onClose: () => void;
    onToggle: () => void;
  };
  regionLocator: {
    errorCode: GeolocationState['errorCode'];
    isCurrentLocationLoading: boolean;
    status: GeolocationState['status'];
    onCurrentLocationRequest: () => void;
    popup: {
      isOpen: boolean;
      onClose: () => void;
      onOpen: () => void;
    };
  };
};

// 선택 방식에 따른 필터 적용 규칙
type SearchFilterApplyPolicy = {
  bottomSheet: {
    actions: SearchFilterChangeHandlers;
    filterState: SearchFilterState;
    selectedFilterBySectionKey: SelectedFilterBySectionKey;
    onSectionApply: (key: SearchFilterSectionKey) => void;
  };
  footer:
    | {
        hasSelectedFilter: boolean;
        onApply: () => void;
        onReset: () => void;
      }
    | undefined;
  onOpenPopup: () => void;
  onSectionApply: (key: SearchFilterSectionKey) => void;
};

// 즉시 적용 규칙 생성에 필요한 값
type CreateInstantApplyPolicyOptions = {
  actions: SearchFilterChangeHandlers;
  filterState: SearchFilterState;
  selectedFilterBySectionKey: SelectedFilterBySectionKey;
  onClosePopup: () => void;
  onSectionApply: (key: SearchFilterSectionKey) => void;
};

// 확인 적용 규칙 생성에 필요한 값
type CreateConfirmApplyPolicyOptions = {
  actions: SearchFilterChangeHandlers;
  filterState: SearchFilterState;
  hasSelectedFilter: boolean;
  selectedFilterBySectionKey: SelectedFilterBySectionKey;
  onApply: () => void;
  onOpenPopup: () => void;
  onReset: () => void;
  onSectionApply: (key: SearchFilterSectionKey) => void;
  onAsideSectionApply: (key: SearchFilterSectionKey) => void;
};

// 별도 동작이 필요 없는 경우의 빈 기능
const NO_OPERATION = (): void => undefined;

// 선택 직후 저장과 팝업 닫기 기능 구성
function createInstantApplyActions(
  actions: SearchFilterChangeHandlers,
  closePopup: () => void,
): SearchFilterChangeHandlers {
  return {
    ...actions,
    onSectionOptionSelect: (key, code): void => {
      // 단일 선택 반영과 팝업 닫기
      actions.onSectionOptionSelect(key, code);
      closePopup();
    },
    onSectionOptionToggle: (key, code): void => {
      // 선택 상태 전환과 팝업 닫기
      actions.onSectionOptionToggle(key, code);
      closePopup();
    },
    onSectionSelectionChange: (key, codes): void => {
      // 여러 선택값 반영과 팝업 닫기
      actions.onSectionSelectionChange(key, codes);
      closePopup();
    },
  };
}

// 선택 즉시 적용하는 규칙 구성
function createInstantApplyPolicy({
  actions,
  filterState,
  selectedFilterBySectionKey,
  onClosePopup,
  onSectionApply,
}: CreateInstantApplyPolicyOptions): SearchFilterApplyPolicy {
  return {
    bottomSheet: {
      actions: createInstantApplyActions(actions, onClosePopup),
      filterState,
      selectedFilterBySectionKey,
      onSectionApply,
    },
    footer: undefined,
    onOpenPopup: NO_OPERATION,
    onSectionApply,
  };
}

// 확인 후 적용하는 규칙 구성
function createConfirmApplyPolicy({
  actions,
  filterState,
  hasSelectedFilter,
  selectedFilterBySectionKey,
  onApply,
  onOpenPopup,
  onReset,
  onSectionApply,
  onAsideSectionApply,
}: CreateConfirmApplyPolicyOptions): SearchFilterApplyPolicy {
  return {
    bottomSheet: {
      actions,
      filterState,
      selectedFilterBySectionKey,
      onSectionApply,
    },
    footer: {
      hasSelectedFilter,
      onApply,
      onReset,
    },
    onOpenPopup,
    onSectionApply: onAsideSectionApply,
  };
}

// 검색 필터 화면의 상태와 동작 통합 관리
export default function useSearchFilterController({
  initialFilterCodes,
  region,
  variant,
  onFilterStateChange,
}: UseSearchFilterControllerOptions): UseSearchFilterControllerReturn {
  // 서비스별 필터 설정
  const config = SEARCH_FILTER_CONFIGS[variant];

  // 실제 적용된 필터 상태와 변경 기능
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

  // 처음 전달된 필터 선택값 반영
  useInitialFilterSelection({ actions, initialFilterCodes });

  useEffect(() => {
    // 필터 변경 결과의 외부 전달
    onFilterStateChange?.(filterState);
  }, [filterState, onFilterStateChange]);

  // 현재 위치 조회와 지역 선택 팝업 상태
  const { geolocation, regionPopup } = useRegionLocator();

  // 필터 팝업 열림 상태와 제어 기능
  const {
    isOpen: isFilterPopupOpen,
    openPopup: openFilterPopup,
    closePopup: closeFilterPopup,
  } = usePopup();

  // 확인 전까지 보관하는 임시 필터 상태
  const temp = useTempSearchFilter({
    config,
    filterState,
    onApply: applyFilterState,
  });

  // 실제 필터 범위 적용
  const handleSectionApply = (key: SearchFilterSectionKey): void => {
    const section = config.sections.find(
      (currentSection) => currentSection.key === key,
    );

    if (section?.type === 'range') {
      // 범위 선택 완료 후 팝업 닫기
      closeFilterPopup();
      return;
    }

    if (key === 'price') {
      // 입력한 가격 범위 저장과 팝업 닫기
      applyPriceRange();
      closeFilterPopup();
    }
  };

  // 확인 전 임시 가격 범위 저장
  const handleTempSectionApply = (key: SearchFilterSectionKey): void => {
    if (key === 'price') {
      temp.applyPriceRange();
    }
  };

  // 임시 필터의 실제 적용
  const handleTempApply = (): void => {
    temp.apply();
    closeFilterPopup();
  };

  // 설정된 적용 방식에 맞는 규칙 선택
  const applyPolicy =
    config.bottomSheetApplyMode === 'instant'
      ? createInstantApplyPolicy({
          actions,
          filterState,
          selectedFilterBySectionKey,
          onClosePopup: closeFilterPopup,
          onSectionApply: handleSectionApply,
        })
      : createConfirmApplyPolicy({
          actions: temp.actions,
          filterState: temp.filterState,
          hasSelectedFilter: temp.hasSelectedFilter,
          selectedFilterBySectionKey: temp.selectedFilterBySectionKey,
          onApply: handleTempApply,
          onOpenPopup: temp.open,
          onReset: temp.reset,
          onSectionApply: handleTempSectionApply,
          onAsideSectionApply: handleSectionApply,
        });

  // 필터 팝업 열기와 닫기 전환
  const handleFilterPopupToggle = (): void => {
    if (isFilterPopupOpen) {
      closeFilterPopup();
      return;
    }

    applyPolicy.onOpenPopup();
    openFilterPopup();
  };

  const { asideModel, bottomSheetModel } = useSearchFilterViewModel({
    aside: {
      actions,
      filterState,
      selectedFilterBySectionKey,
      onSectionApply: applyPolicy.onSectionApply,
    },
    bottomSheet: applyPolicy.bottomSheet,
    config,
    isCurrentLocationLoading: geolocation.isLoading,
    region,
    onCurrentLocationRequest: geolocation.request,
    onRegionOpen: regionPopup.open,
  });

  // 화면에서 사용할 최종 상태와 기능 전달
  return {
    asideModel,
    bottomSheetModel,
    config,
    filter: {
      hasSelectedFilter,
      selectedServiceItems,
      state: filterState,
      onRemovePriceRange: removePriceRange,
      onRemoveSelectedCode: removeSelectedCode,
      onReset: reset,
    },
    filterPopup: {
      footer: applyPolicy.footer,
      isOpen: isFilterPopupOpen,
      onClose: closeFilterPopup,
      onToggle: handleFilterPopupToggle,
    },
    regionLocator: {
      errorCode: geolocation.errorCode,
      isCurrentLocationLoading: geolocation.isLoading,
      status: geolocation.status,
      onCurrentLocationRequest: geolocation.request,
      popup: {
        isOpen: regionPopup.isOpen,
        onClose: regionPopup.close,
        onOpen: regionPopup.open,
      },
    },
  };
}
