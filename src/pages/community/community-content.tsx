import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import CommunityList from '@/components/community/community-list.tsx';
import SearchFilter from '@/components/ui/search-filter/search-filter.tsx';
import ServiceListTitle from '@/components/ui/service-list-title.tsx';
import useRegion from '@/hooks/location/use-region.ts';
import { includesSearchKeyword } from '@/lib/search-utils.ts';
import {
  COMMUNITY_CATEGORIES,
  COMMUNITY_ITEMS,
  POPULAR_COMMUNITY_ITEMS,
} from '@/types/community-constants.ts';
import type { SearchFilterState } from '@/types/search-filter';

export default function CommunityContent(): ReactNode {
  const { region } = useRegion();
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialCategoryCode] = useState(() => searchParams.get('category'));
  const [selectedCategoryCode, setSelectedCategoryCode] =
    useState(initialCategoryCode);
  const searchKeyword = searchParams.get('search')?.trim() ?? '';
  const selectedCategory = COMMUNITY_CATEGORIES.find(
    ({ code }) => code === selectedCategoryCode,
  );
  const categoryItems = (() => {
    if (!selectedCategory || selectedCategory.code === 'all') {
      return COMMUNITY_ITEMS;
    }

    if (selectedCategory.code === 'popular') {
      return POPULAR_COMMUNITY_ITEMS;
    }

    return COMMUNITY_ITEMS.filter(
      ({ category }) => category === selectedCategory.label,
    );
  })();
  const items = categoryItems.filter((item) =>
    includesSearchKeyword(searchKeyword, [
      item.title,
      item.content,
      item.category,
      item.tags,
      item.location,
    ]),
  );

  useEffect(() => {
    if (!searchParams.has('category')) {
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams);

    nextSearchParams.delete('category');
    setSearchParams(nextSearchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const handleFilterStateChange = useCallback(
    (filterState: SearchFilterState): void => {
      setSelectedCategoryCode(
        filterState.selectedCodesByKey.category?.[0] ?? null,
      );
    },
    [],
  );

  return (
    <main className="service-list-page min-h-screen pb-20">
      <ServiceListTitle>
        {searchKeyword
          ? `${region} “${searchKeyword}” 검색 결과`
          : `${region} 동네생활`}
      </ServiceListTitle>
      <div className="service-list-layout">
        <SearchFilter
          region={region}
          initialFilterCodes={
            selectedCategory ? { category: selectedCategory.code } : undefined
          }
          variant="community"
          onFilterStateChange={handleFilterStateChange}
        />
        <CommunityList
          isRanked={selectedCategory?.code === 'popular'}
          items={items}
          region={region}
        />
      </div>
    </main>
  );
}
