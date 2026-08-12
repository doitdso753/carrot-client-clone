import type { ReactNode } from 'react';
import LocalProfileBoardList from '@/components/local-profile/local-profile-board-list.tsx';
import SearchFilter from '@/components/ui/search-filter.tsx';
import ServiceListTitle from '@/components/ui/service-list-title.tsx';
import useRegion from '@/hooks/location/use-region.ts';
import type { LocalProfileItem } from '@/types/types.ts';

type LocalProfileContentProps = {
  items: LocalProfileItem[];
};

export default function LocalProfileContent({
  items,
}: LocalProfileContentProps): ReactNode {
  const { region } = useRegion();

  return (
    <main className="service-list-page min-h-screen pb-20">
      <ServiceListTitle>{region} 동네업체</ServiceListTitle>
      <div className="service-list-layout">
        <SearchFilter region={region} variant="localProfile" />
        <LocalProfileBoardList items={items} region={region} />
      </div>
    </main>
  );
}
