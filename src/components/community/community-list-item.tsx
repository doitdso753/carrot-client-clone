import type { ReactNode } from 'react';
import { Link } from 'react-router';
import CommunityBoardItem from '@/components/ui/board-list/community-board-item.tsx';
import type { CommunityItem } from '@/types/types.ts';

type CommunityListItemProps = {
  item: CommunityItem;
};

export default function CommunityListItem({
  item,
}: CommunityListItemProps): ReactNode {
  return (
    <li>
      <article className="flex min-w-0 justify-between gap-[1.6rem]">
        <Link
          className="flex min-w-0 flex-1 cursor-pointer"
          to={`/community/${item.id}`}
        >
          <CommunityBoardItem item={item} variant="list" />
        </Link>
      </article>
    </li>
  );
}
