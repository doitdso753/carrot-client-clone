import { useCallback, useState, type ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import GroupList from '@/components/group/group-list.tsx';
import SearchFilter from '@/components/ui/search-filter/search-filter.tsx';
import ServiceListTitle from '@/components/ui/service-list-title.tsx';
import useRegion from '@/hooks/location/use-region.ts';
import { includesSearchKeyword } from '@/lib/search-utils.ts';
import { GROUP_ITEMS } from '@/types/group';
import type { SearchFilterState } from '@/types/search-filter';

export default function GroupContent(): ReactNode {
  const { region } = useRegion();
  const [searchParams] = useSearchParams();
  const [selectedCategoryCode, setSelectedCategoryCode] = useState('all');
  const searchKeyword = searchParams.get('search')?.trim() ?? '';
  const categoryItems =
    selectedCategoryCode === 'all'
      ? GROUP_ITEMS
      : GROUP_ITEMS.filter(
          ({ category }) => category.categoryCode === selectedCategoryCode,
        );
  const items = categoryItems.filter((item) =>
    includesSearchKeyword(searchKeyword, [
      item.title,
      item.description,
      item.category.categoryName,
      item.location,
    ]),
  );

  const handleFilterStateChange = useCallback(
    (filterState: SearchFilterState): void => {
      setSelectedCategoryCode(
        filterState.selectedCodesByKey.category?.[0] ?? 'all',
      );
    },
    [],
  );

  return (
    <main className="service-list-page min-h-screen pb-20">
      <ServiceListTitle>
        {searchKeyword
          ? `${region} “${searchKeyword}” 검색 결과`
          : `${region} 모임`}
      </ServiceListTitle>
      <div className="service-list-layout">
        <SearchFilter
          region={region}
          variant="group"
          onFilterStateChange={handleFilterStateChange}
        />
        <GroupList items={items} region={region} />
      </div>
    </main>
  );
}
