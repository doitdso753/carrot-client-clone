import { useMemo } from 'react';
import {
  getSelectedFilterBySectionKey,
  getSelectedServiceItems,
} from '@/lib/search-filter-summary-utils.ts';
import type {
  SearchFilterConfig,
  SearchFilterState,
  SelectedFilterBySectionKey,
  SelectedSearchFilterItem,
} from '@/types/search-filter';

type UseSearchFilterSelectionReturn = {
  hasSelectedSectionFilter: boolean;
  selectedFilterBySectionKey: SelectedFilterBySectionKey;
  selectedServiceItems: SelectedSearchFilterItem[];
};

// 필터 원본 상태를 화면에서 사용하는 선택 정보로 변환
export default function useSearchFilterSelection(
  config: SearchFilterConfig,
  filterState: SearchFilterState,
): UseSearchFilterSelectionReturn {
  return useMemo(() => {
    const selectedFilterBySectionKey = getSelectedFilterBySectionKey(
      config.sections,
      filterState,
    );
    const selectedServiceItems = getSelectedServiceItems({
      config,
      selectedFilterBySectionKey,
    });

    return {
      hasSelectedSectionFilter: selectedServiceItems.length > 0,
      selectedFilterBySectionKey,
      selectedServiceItems,
    };
  }, [config, filterState]);
}
