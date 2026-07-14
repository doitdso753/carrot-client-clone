import type { ReactNode } from 'react';
import CardList from '@/components/ui/card-list/card-list';
import SearchFilter from '@/components/ui/search-filter';
import useRegion from '@/hooks/use-region.ts';
import {
  BUY_SELL_FILTER_CATEGORIES,
  BUY_SELL_ITEMS,
} from '@/types/buy-sell-constants.ts';

export default function BuySellContent(): ReactNode {
  const { region } = useRegion();

  return (
    <main className="service-list-page min-h-screen pb-20">
      <div className="service-list-layout">
        <SearchFilter
          categories={BUY_SELL_FILTER_CATEGORIES}
          filterStorageKey="search-filter:buy-sell"
          region={region}
        />
        <CardList items={BUY_SELL_ITEMS} title={`${region} 중고거래`} />
      </div>
    </main>
  );
}
