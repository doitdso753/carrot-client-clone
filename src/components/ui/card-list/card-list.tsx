import type { ReactNode } from 'react';
import CardItem from './card-item.tsx';
import type { BuySellItem } from '@/types/types.ts';

type CardListProps = {
  items: BuySellItem[];
  title?: ReactNode;
};

export default function CardList({ items, title }: CardListProps): ReactNode {
  return (
    <section className="min-w-0 flex-1">
      {title && (
        <h1 className="mb-14 text-2xl font-bold text-(--color-palette-gray-1000)">
          {title}
        </h1>
      )}
      <div className="card-list-grid">
        {items.map((item) => (
          <CardItem item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
