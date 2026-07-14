import type { ReactNode } from 'react';
import CardItem from './card-item.tsx';
import type { BuySellItem } from '@/types/types.ts';

type CardListProps = {
  items: BuySellItem[];
};

export default function CardList({ items }: CardListProps): ReactNode {
  return (
    <section className="list-content min-w-0 flex-1">
      <div className="card-list-grid">
        {items.map((item) => (
          <CardItem item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
