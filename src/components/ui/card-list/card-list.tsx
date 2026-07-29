import type { ReactNode } from 'react';
import ListEmptyState from '@/components/ui/list-empty-state.tsx';
import CardItem from './card-item.tsx';
import type { BuySellItem } from '@/types/types.ts';

type CardListProps = {
  items: BuySellItem[];
  region: string;
};

export default function CardList({ items, region }: CardListProps): ReactNode {
  return (
    <section className="list-content min-w-0 flex-1">
      {items.length > 0 ? (
        <div className="card-list-grid">
          {items.map((item) => (
            <CardItem item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <ListEmptyState region={region} />
      )}
    </section>
  );
}
