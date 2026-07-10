import type { ReactNode } from 'react';
import CardList from '@/components/ui/card-list/card-list';
import { BUY_SELL_ITEMS } from '@/types/buy-sell-constants.ts';
import BuySellFilter from '@/components/buy-sell/buy-sell-filter';
import BuySellList from '@/components/buy-sell/buy-sell-list';
import BuySellTitle from '@/components/buy-sell/buy-sell-title';

export default function BuySellContent(): ReactNode {
  return (
    <main className="buy-sell-wrapper min-h-screen pb-20">
      <div className="buy-sell-content-layout">
        <BuySellFilter />
        <BuySellList items={BUY_SELL_ITEMS} />
        <CardList
          items={BUY_SELL_ITEMS}
          title="서울특별시 중구 신당동 중고거래"
        />
      </div>
    </main>
  );
}
