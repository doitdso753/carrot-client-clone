import type { ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import CardList from '@/components/ui/card-list/card-list';
import SearchFilter from '@/components/ui/search-filter/search-filter.tsx';
import ServiceListTitle from '@/components/ui/service-list-title.tsx';
import useRegion from '@/hooks/location/use-region.ts';
import { includesRegion, includesSearchKeyword } from '@/lib/search-utils.ts';
import { BUY_SELL_ITEMS } from '@/types/buy-sell';

export default function BuySellContent(): ReactNode {
  const { region } = useRegion();
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('search')?.trim() ?? '';
  const filteredItems = BUY_SELL_ITEMS.filter(
    (item) =>
      includesRegion(region, [item.location]) &&
      includesSearchKeyword(searchKeyword, [
        item.title,
        item.description,
        item.categoryText,
        item.location,
      ]),
  );

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
