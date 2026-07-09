import type { ReactNode } from 'react';
import BuySellCard from './buy-sell-card.tsx';
import type { BuySellItem } from '@/types/types.ts';

type BuySellListProps = {
  items: BuySellItem[];
};

export default function BuySellList({ items }: BuySellListProps): ReactNode {
  return (
    <section className="min-w-0 flex-1">
      <div className="common-card-grid">
        {items.map((item) => (
          <BuySellCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
