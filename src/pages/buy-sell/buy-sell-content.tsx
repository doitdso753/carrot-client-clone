import type { ReactNode } from 'react';
import CardList from '@/components/ui/card-list/card-list';
import SearchFilter from '@/components/ui/search-filter';
import ServiceListTitle from '@/components/ui/service-list-title.tsx';
import useRegion from '@/hooks/use-region.ts';
import { BUY_SELL_ITEMS } from '@/types/buy-sell-constants.ts';

export default function BuySellContent(): ReactNode {
  const { region } = useRegion();

  return (
    <main className="service-list-page min-h-screen pb-20">
      <ServiceListTitle>{region} 중고거래</ServiceListTitle>
      <div className="service-list-layout">
        <SearchFilter region={region} variant="buySell" />
        <CardList items={BUY_SELL_ITEMS} region={region} />
      </div>
    </main>
  );
}
