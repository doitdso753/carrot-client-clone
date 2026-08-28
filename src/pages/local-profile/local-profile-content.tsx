import type { ReactNode } from 'react';
import LocalProfileBoardList from '@/components/local-profile/local-profile-board-list.tsx';
import SearchFilter from '@/components/ui/search-filter/search-filter.tsx';
import ServiceListTitle from '@/components/ui/service-list-title.tsx';
import useListFilter from '@/hooks/search-filter/use-list-filter.ts';
import type { LocalProfileItem } from '@/types/local-profile';

type LocalProfileContentProps = {
  items: LocalProfileItem[];
};

export default function LocalProfileContent({
  items,
}: LocalProfileContentProps): ReactNode {
  const { filteredItems, region, searchKeyword } = useListFilter({
    getRegionValues: (item) => [item.location, item.regionText],
    getSearchValues: (item) => [
      item.name,
      item.category,
      item.description,
      item.location,
      item.regionText,
    ],
    items,
  });

  return (
    <main className="service-list-page min-h-screen pb-20">
      <ServiceListTitle>
        {searchKeyword
          ? `${region} “${searchKeyword}” 검색 결과`
          : `${region} 동네업체`}
      </ServiceListTitle>
      <div className="service-list-layout">
        <SearchFilter region={region} variant="localProfile" />
        <LocalProfileBoardList items={filteredItems} region={region} />
      </div>
    </main>
  );
}
