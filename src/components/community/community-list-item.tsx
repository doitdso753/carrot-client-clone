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
  const boardItem = {
    commentCount: item.commentCount,
    description: item.content,
    imageUrl: item.imageUrl,
    likeCount: item.likeCount,
    metadata: (
      <>
        <span>{item.category}</span>
        <span aria-hidden="true">·</span>
        <span>{item.location}</span>
        <span aria-hidden="true">·</span>
        <span>{item.createdAtText}</span>
      </>
    ),
    title: item.title,
  };

  return (
    <li>
      <article className="flex min-w-0 justify-between gap-[1.6rem]">
        <Link
          className="flex min-w-0 flex-1 cursor-pointer"
          to={`/community/${item.id}`}
        >
          <CommunityBoardItem item={boardItem} variant="list" />
        </Link>
      </article>
    </li>
  );
}
