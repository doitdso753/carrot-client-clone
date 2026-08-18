import type { ReactNode } from 'react';
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
    id: item.id,
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
        <CommunityBoardItem item={boardItem} variant="list" />
      </article>
    </li>
  );
}
