import type { ReactNode } from 'react';
import CommunityListItem from '@/components/community/community-list-item.tsx';
import ListEmptyState from '@/components/ui/list-empty-state.tsx';
import type { CommunityItem } from '@/types/community';

type CommunityListProps = {
  isRanked?: boolean;
  items: readonly CommunityItem[];
  region: string;
};

export default function CommunityList({
  isRanked = false,
  items,
  region,
}: CommunityListProps): ReactNode {
  return (
    <section className="list-content min-w-0 flex-1">
      {items.length > 0 ? (
        <ul className="flex flex-col gap-[2.8rem]">
          {items.map((item, index) => (
            <CommunityListItem
              item={item}
              key={item.id}
              rank={isRanked ? index + 1 : undefined}
            />
          ))}
        </ul>
      ) : (
        <ListEmptyState region={region} />
      )}
    </section>
  );
}
