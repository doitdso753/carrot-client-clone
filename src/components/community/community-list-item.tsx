import type { ReactNode } from 'react';
import { Link } from 'react-router';
import CommunityBoardItem from '@/components/ui/board-list/community-board-item.tsx';
import type { CommunityItem } from '@/types/community';

type CommunityListItemProps = {
  item: CommunityItem;
  rank?: number;
};

export default function CommunityListItem({
  item,
  rank,
}: CommunityListItemProps): ReactNode {
  return (
    <li>
      <article className="flex min-w-0 justify-between gap-[1.6rem]">
        <Link
          className={`community-list-item-link min-w-0 flex-1 cursor-pointer ${rank ? 'has-rank' : ''}`}
          to={`/community/${item.id}`}
        >
          {rank && <span className="community-list-item-rank">{rank}</span>}
          <CommunityBoardItem item={item} variant="default" />
        </Link>
      </article>
    </li>
  );
}
