import type { ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import CarCardList from '@/components/ui/card-list/car-card-list.tsx';
import SearchFilter from '@/components/ui/search-filter/search-filter.tsx';
import ServiceListTitle from '@/components/ui/service-list-title.tsx';
import useRegion from '@/hooks/location/use-region.ts';
import { includesRegion, includesSearchKeyword } from '@/lib/search-utils.ts';
import { CAR_LIST_ITEMS } from '@/types/cars';

export default function CarsContent(): ReactNode {
  const { region } = useRegion();
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('search')?.trim() ?? '';
  const filteredItems = CAR_LIST_ITEMS.filter(
    (item) =>
      includesRegion(region, [item.location, item.address]) &&
      includesSearchKeyword(searchKeyword, [
        item.title,
        item.description,
        item.location,
        item.address,
      ]),
  );

  return (
    <main className="service-list-page min-h-screen pb-20">
      <ServiceListTitle>
        {searchKeyword
          ? `${region} “${searchKeyword}” 검색 결과`
          : `${region} 중고차`}
      </ServiceListTitle>
      <div className="service-list-layout">
        <SearchFilter region={region} variant="cars" />
        <CarCardList items={filteredItems} region={region} />
      </div>
    </main>
  );
}
