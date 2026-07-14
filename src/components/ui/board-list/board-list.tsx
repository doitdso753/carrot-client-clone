import type { ReactNode } from 'react';
import BoardItem from '@/components/ui/board-list/board-item.tsx';
import type { LocalProfileItem } from '@/types/types.ts';

type BoardListProps = {
  items: LocalProfileItem[];
  title: string;
};

export default function BoardList({ items, title }: BoardListProps): ReactNode {
  return (
    <section className="min-w-0 flex-1">
      <h1 className="mb-14 text-2xl font-bold text-(--color-palette-gray-1000)">
        {title}
      </h1>
      <ul className="board-list">
        {items.map((item) => (
          <BoardItem item={item} key={item.id} />
        ))}
      </ul>
    </section>
  );
}
