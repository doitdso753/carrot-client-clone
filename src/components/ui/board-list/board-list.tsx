import type { ReactNode } from 'react';
import BoardItem from '@/components/ui/board-list/board-item.tsx';
import type { LocalProfileItem } from '@/types/types.ts';

type BoardListProps = {
  items: LocalProfileItem[];
};

export default function BoardList({ items }: BoardListProps): ReactNode {
  return (
    <section className="list-content min-w-0 flex-1">
      <ul className="board-list">
        {items.map((item) => (
          <BoardItem item={item} key={item.id} />
        ))}
      </ul>
    </section>
  );
}
