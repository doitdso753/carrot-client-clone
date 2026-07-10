import type { ReactNode } from 'react';
import CardList from '@/components/ui/card-list/card-list';
import SearchFilter from '@/components/ui/search-filter';
import { BUY_SELL_ITEMS } from '@/types/buy-sell-constants.ts';

export default function BuySellContent(): ReactNode {
  return (
    <main className="buy-sell-wrapper min-h-screen pb-20">
      <div className="buy-sell-content-layout">
        <SearchFilter />
        <CardList
          items={BUY_SELL_ITEMS}
          title="서울특별시 중구 신당동 중고거래"
        />
      </div>
    </main>
  );
}
