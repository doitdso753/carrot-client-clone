import type { ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import LocalProfileBoardList from '@/components/local-profile/local-profile-board-list.tsx';
import SearchFilter from '@/components/ui/search-filter/search-filter.tsx';
import ServiceListTitle from '@/components/ui/service-list-title.tsx';
import useRegion from '@/hooks/location/use-region.ts';
import { includesSearchKeyword } from '@/lib/search-utils.ts';
import type { LocalProfileItem } from '@/types/types.ts';

type LocalProfileContentProps = {
  items: LocalProfileItem[];
};

export default function LocalProfileContent({
  items,
}: LocalProfileContentProps): ReactNode {
  const { region } = useRegion();
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('search')?.trim() ?? '';
  const filteredItems = items.filter((item) =>
    includesSearchKeyword(searchKeyword, [
      item.name,
      item.category,
      item.description,
      item.location,
      item.regionText,
    ]),
  );

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
