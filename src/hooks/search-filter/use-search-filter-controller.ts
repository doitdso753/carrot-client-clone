import { useEffect } from 'react';
import useRegionLocator from '@/hooks/location/use-region-locator.ts';
import useInitialFilterSelection from '@/hooks/search-filter/use-initial-filter-selection.ts';
import useSearchFilterState from '@/hooks/search-filter/use-search-filter-state.ts';
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
  type SelectedSearchFilterItem,
} from '@/types/search-filter';

type UseSearchFilterControllerOptions = {
  initialFilterCodes?: InitialFilterCodeMap;
  region: string;
  variant: SearchFilterVariant;
  onFilterStateChange?: (filterState: SearchFilterState) => void;
};

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

function createInstantApplyActions(
  actions: SearchFilterChangeHandlers,
  closePopup: () => void,
): SearchFilterChangeHandlers {
  return {
    ...actions,
    onSectionOptionSelect: (key, code): void => {
      actions.onSectionOptionSelect(key, code);
      closePopup();
    },
    onSectionOptionToggle: (key, code): void => {
      actions.onSectionOptionToggle(key, code);
      closePopup();
    },
    onSectionSelectionChange: (key, codes): void => {
      actions.onSectionSelectionChange(key, codes);
      closePopup();
    },
  };
}

export default function useSearchFilterController({
  initialFilterCodes,
  region,
  variant,
  onFilterStateChange,
}: UseSearchFilterControllerOptions): UseSearchFilterControllerReturn {
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

  useInitialFilterSelection({ actions, initialFilterCodes });

  useEffect(() => {
    onFilterStateChange?.(filterState);
  }, [filterState, onFilterStateChange]);

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
    onRegionOpen: regionPopup.open,
  };
  const asideModel = createSearchFilterViewModel(commonViewModel, {
    actions,
    filterState,
    selectedFilterBySectionKey,
    onSectionApply: handleSectionApply,
  });
  const bottomSheetModel = createSearchFilterViewModel(commonViewModel, {
    actions: isInstantApply
      ? createInstantApplyActions(actions, closeFilterPopup)
      : temp.actions,
    filterState: isInstantApply ? filterState : temp.filterState,
    selectedFilterBySectionKey: isInstantApply
      ? selectedFilterBySectionKey
      : temp.selectedFilterBySectionKey,
    onSectionApply: isInstantApply
      ? handleSectionApply
      : handleTempSectionApply,
  });

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
      footer: isInstantApply
        ? undefined
        : {
            hasSelectedFilter: temp.hasSelectedFilter,
            onApply: handleTempApply,
            onReset: temp.reset,
          },
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
