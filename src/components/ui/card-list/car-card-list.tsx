import type { ReactNode } from 'react';
import CarCardItem from '@/components/ui/card-list/car-card-item.tsx';
import ListEmptyState from '@/components/ui/list-empty-state.tsx';
import type { CarListItem } from '@/types/types.ts';

type CarCardListProps = {
  items: CarListItem[];
  region: string;
};

export default function CarCardList({
  items,
  region,
}: CarCardListProps): ReactNode {
  return (
    <section className="list-content min-w-0 flex-1" aria-label="중고차 목록">
      {items.length > 0 ? (
        <div className="car-card-list-grid">
          {items.map((item) => (
            <CarCardItem item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <ListEmptyState region={region} />
      )}
    </section>
  );
}
