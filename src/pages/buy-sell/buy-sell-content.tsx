import type { ReactNode } from 'react';
import { BUY_SELL_ITEMS } from '@/types/buy-sell-constants.ts';
import BuySellFilter from '@/components/buy-sell/buy-sell-filter';
import BuySellList from '@/components/buy-sell/buy-sell-list';
import BuySellTitle from '@/components/buy-sell/buy-sell-title';

export default function BuySellContent(): ReactNode {
  return (
    <main className="buy-sell-wrapper min-h-screen pb-20">
      <BuySellTitle />
      <div className="buy-sell-content-layout">
        <BuySellFilter />
        <BuySellList items={BUY_SELL_ITEMS} />
      </div>
    </main>
  );
}
