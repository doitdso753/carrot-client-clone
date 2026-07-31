import type { ReactNode } from 'react';
import BoardList from '@/components/ui/board-list/board-list.tsx';
import SearchFilter from '@/components/ui/search-filter.tsx';
import ServiceListTitle from '@/components/ui/service-list-title.tsx';
import useRegion from '@/hooks/use-region.ts';
import { LOCAL_PROFILE_ITEMS } from '@/types/local-profile-constants.ts';

export default function LocalProfileContent(): ReactNode {
  const { region } = useRegion();

  return (
    <main className="service-list-page min-h-screen pb-20">
      <ServiceListTitle>{region} 동네업체</ServiceListTitle>
      <div className="service-list-layout">
        <SearchFilter region={region} variant="localProfile" />
        <BoardList items={LOCAL_PROFILE_ITEMS} region={region} />
      </div>
    </main>
  );
}
