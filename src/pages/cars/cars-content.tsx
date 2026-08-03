import type { ReactNode } from 'react';
import ListEmptyState from '@/components/ui/list-empty-state.tsx';
import SearchFilter from '@/components/ui/search-filter.tsx';
import ServiceListTitle from '@/components/ui/service-list-title.tsx';
import useRegion from '@/hooks/use-region.ts';

export default function CarsContent(): ReactNode {
  const { region } = useRegion();

  return (
    <main className="service-list-page min-h-screen pb-20">
      <ServiceListTitle>{region} 중고차</ServiceListTitle>
      <div className="service-list-layout">
        <SearchFilter region={region} variant="cars" />
        <section
          className="list-content service-list-empty"
          aria-label="중고차 목록"
        >
          <ListEmptyState region={region} />
        </section>
      </div>
    </main>
  );
}
