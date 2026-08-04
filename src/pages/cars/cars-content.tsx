import type { ReactNode } from 'react';
import CarCardList from '@/components/ui/card-list/car-card-list.tsx';
import SearchFilter from '@/components/ui/search-filter.tsx';
import ServiceListTitle from '@/components/ui/service-list-title.tsx';
import useRegion from '@/hooks/use-region.ts';
import { CAR_LIST_ITEMS } from '@/types/car-list-constants.ts';

export default function CarsContent(): ReactNode {
  const { region } = useRegion();

  return (
    <main className="service-list-page min-h-screen pb-20">
      <ServiceListTitle>{region} 중고차</ServiceListTitle>
      <div className="service-list-layout">
        <SearchFilter region={region} variant="cars" />
        <CarCardList items={CAR_LIST_ITEMS} region={region} />
      </div>
    </main>
  );
}
