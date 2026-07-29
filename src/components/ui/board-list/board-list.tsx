import type { ReactNode } from 'react';
import BoardItem from '@/components/ui/board-list/board-item.tsx';
import ListEmptyState from '@/components/ui/list-empty-state.tsx';
import type { LocalProfileItem } from '@/types/types.ts';

type BoardListProps = {
  items: LocalProfileItem[];
  region: string;
};

export default function BoardList({
  items,
  region,
}: BoardListProps): ReactNode {
  return (
    <section className="list-content min-w-0 flex-1">
      {items.length > 0 ? (
        <ul className="board-list">
          {items.map((item) => (
            <BoardItem item={item} key={item.id} />
          ))}
        </ul>
      ) : (
        <ListEmptyState region={region} />
      )}
    </section>
  );
}
