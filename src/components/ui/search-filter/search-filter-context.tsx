import { createContext, useContext, type ReactNode } from 'react';
import type {
  SearchFilterConfig,
  SearchFilterFieldName,
  SearchFilterSectionKey,
  SearchFilterSectionSelection,
} from '@/types/search-filter-configs.ts';

export type SearchFilterContextValue = {
  config: SearchFilterConfig;
  isCurrentLocationLoading: boolean;
  maximumPrice: string;
  minimumPrice: string;
  selectedFilterBySectionKey: Partial<
    Record<SearchFilterSectionKey, SearchFilterSectionSelection>
  >;
  region: string;
  selectedPrice: string;
  onCurrentLocationRequest: () => void;
  onRegionOpen: () => void;
  onSectionCodeToggle: (key: SearchFilterSectionKey, code: string) => void;
  onSectionApply: (key: SearchFilterSectionKey) => void;
  onSectionCodesChange: (key: SearchFilterSectionKey, codes: string[]) => void;
  onSectionFieldChange: (
    key: SearchFilterSectionKey,
    field: SearchFilterFieldName,
    value: string,
  ) => void;
  onSectionValueChange: (key: SearchFilterSectionKey, value: string) => void;
};

type SearchFilterProviderProps = {
  children: ReactNode;
  value: SearchFilterContextValue;
};

const SearchFilterContext = createContext<SearchFilterContextValue | null>(
  null,
);

export function SearchFilterProvider({
  children,
  value,
}: SearchFilterProviderProps): ReactNode {
  return (
    <SearchFilterContext.Provider value={value}>
      {children}
    </SearchFilterContext.Provider>
  );
}

export function useSearchFilterContext(): SearchFilterContextValue {
  const context = useContext(SearchFilterContext);

  if (!context) {
    throw new Error('SearchFilterContext Provider 안에서 사용해야 합니다.');
  }

  return context;
}
