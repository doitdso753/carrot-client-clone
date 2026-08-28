import type { ReactNode } from 'react';
import CardList from '@/components/ui/card-list/card-list';
import SearchFilter from '@/components/ui/search-filter/search-filter.tsx';
import ServiceListTitle from '@/components/ui/service-list-title.tsx';
import useListFilter from '@/hooks/search-filter/use-list-filter.ts';
import { BUY_SELL_ITEMS } from '@/types/buy-sell';

export default function BuySellContent(): ReactNode {
  const { filteredItems, region, searchKeyword } = useListFilter({
    getRegionValues: (item) => [item.location],
    getSearchValues: (item) => [
      item.title,
      item.description,
      item.categoryText,
      item.location,
    ],
    items: BUY_SELL_ITEMS,
  });

  return (
    <main className="service-list-page min-h-screen pb-20">
      <ServiceListTitle>
        {searchKeyword
          ? `${region} “${searchKeyword}” 검색 결과`
          : `${region} 중고거래`}
      </ServiceListTitle>
      <div className="service-list-layout">
        <SearchFilter region={region} variant="buySell" />
        <CardList items={filteredItems} region={region} />
      </div>
    </main>
  );
}
