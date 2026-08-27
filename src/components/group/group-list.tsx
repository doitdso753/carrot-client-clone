import type { ReactNode } from 'react';
import GroupListItem from '@/components/group/group-list-item.tsx';
import ListEmptyState from '@/components/ui/list-empty-state.tsx';
import type { GroupItem } from '@/types/group';

type GroupListProps = {
  items: readonly GroupItem[];
  region: string;
};

export default function GroupList({
  items,
  region,
}: GroupListProps): ReactNode {
  return (
    <section className="list-content min-w-0 flex-1">
      {items.length > 0 ? (
        <ul className="group-list">
          {items.map((item) => (
            <GroupListItem item={item} key={item.id} />
          ))}
        </ul>
      ) : (
        <ListEmptyState region={region} />
      )}
    </section>
  );
}
