import type {
  SearchFilterSectionKey,
  SearchFilterViewModel,
} from '@/types/search-filter';

type CommonSearchFilterViewModel = Pick<
  SearchFilterViewModel,
  | 'config'
  | 'isCurrentLocationLoading'
  | 'onCurrentLocationRequest'
  | 'onRegionOpen'
  | 'region'
>;

type SearchFilterViewModelState = Pick<
  SearchFilterViewModel,
  'actions' | 'filterState' | 'selectedFilterBySectionKey'
> & {
  onSectionApply: (key: SearchFilterSectionKey) => void;
};

type UseSearchFilterViewModelOptions = CommonSearchFilterViewModel & {
  aside: SearchFilterViewModelState;
  bottomSheet: SearchFilterViewModelState;
};

type UseSearchFilterViewModelReturn = {
  asideModel: SearchFilterViewModel;
  bottomSheetModel: SearchFilterViewModel;
};

// 공통 화면 정보와 화면별 필터 상태를 조합
export default function useSearchFilterViewModel({
  aside,
  bottomSheet,
  ...commonViewModel
}: UseSearchFilterViewModelOptions): UseSearchFilterViewModelReturn {
  return {
    asideModel: {
      ...commonViewModel,
      ...aside,
    },
    bottomSheetModel: {
      ...commonViewModel,
      ...bottomSheet,
    },
  };
}
