import type { ReactNode } from 'react';
import CarCardList from '@/components/ui/card-list/car-card-list.tsx';
import SearchFilter from '@/components/ui/search-filter/search-filter.tsx';
import ServiceListTitle from '@/components/ui/service-list-title.tsx';
import useListFilter from '@/hooks/search-filter/use-list-filter.ts';
import { CAR_LIST_ITEMS } from '@/types/cars';

export default function CarsContent(): ReactNode {
  const { filteredItems, region, searchKeyword } = useListFilter({
    getRegionValues: (item) => [item.location, item.address],
    getSearchValues: (item) => [
      item.title,
      item.description,
      item.location,
      item.address,
    ],
    items: CAR_LIST_ITEMS,
  });

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
