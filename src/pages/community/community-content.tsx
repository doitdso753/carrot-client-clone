import type { ReactNode } from 'react';
import SearchFilter from '@/components/ui/search-filter/search-filter.tsx';
import ServiceListTitle from '@/components/ui/service-list-title.tsx';
import useRegion from '@/hooks/location/use-region.ts';

export default function CommunityContent(): ReactNode {
  const { region } = useRegion();

  return (
    <main className="service-list-page min-h-screen pb-20">
      <ServiceListTitle>{region} 동네생활</ServiceListTitle>
      <div className="service-list-layout">
        <SearchFilter region={region} variant="community" />
      </div>
    </main>
  );
}
