import type { ReactNode } from 'react';
import CommunityList from '@/components/community/community-list.tsx';
import SearchFilter from '@/components/ui/search-filter/search-filter.tsx';
import ServiceListTitle from '@/components/ui/service-list-title.tsx';
import useRegion from '@/hooks/location/use-region.ts';
import { COMMUNITY_ITEMS } from '@/types/community-constants.ts';

export default function CommunityContent(): ReactNode {
  const { region } = useRegion();

  return (
    <main className="service-list-page min-h-screen pb-20">
      <ServiceListTitle>{region} 동네생활</ServiceListTitle>
      <div className="service-list-layout">
        <SearchFilter region={region} variant="community" />
        <CommunityList items={COMMUNITY_ITEMS} region={region} />
      </div>
    </main>
  );
}
