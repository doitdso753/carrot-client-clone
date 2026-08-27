import type { ReactNode } from 'react';
import { useCallback, useState, type ReactNode } from 'react';
import SearchFilter from '@/components/ui/search-filter/search-filter.tsx';
import ServiceListTitle from '@/components/ui/service-list-title.tsx';
import useRegion from '@/hooks/location/use-region.ts';
import type { SearchFilterState } from '@/types/search-filter';

export default function GroupContent(): ReactNode {
  const { region } = useRegion();

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
      <ServiceListTitle>{region} 모임</ServiceListTitle>
      <div className="service-list-layout">
        <SearchFilter
          region={region}
          variant="group"
          onFilterStateChange={handleFilterStateChange}
        />
      </div>
    </main>
  );
}
