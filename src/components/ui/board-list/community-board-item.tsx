import type { ReactNode } from 'react';
import {
  CommentTextFillIcon,
  LockFillIcon,
  ThumbUpFillIcon,
} from '@/assets/icons';
import { getElapsedTimeText } from '@/lib/date-utils.ts';
import type { CommunityItem } from '@/types/community';

type CommunityBoardItemVariant = 'default' | 'dashboard' | 'group';

type CommunityBoardItemProps = {
  item: CommunityItem & { isPublic?: boolean };
  metadataItems?: readonly string[];
  variant: CommunityBoardItemVariant;
};

type CommunityBoardItemCountProps = {
  count: number;
  icon: ReactNode;
  label: string;
};

const PRIVATE_COMMUNITY_BOARD_TITLE = '모임에만 공개된 게시물이에요.';

function CommunityBoardItemCount({
  count,
  icon,
  label,
}: CommunityBoardItemCountProps): ReactNode {
  return (
    <span className="community-board-item-count flex items-center gap-1 font-normal text-(--color-palette-gray-700) [&>svg]:size-[1.8rem] [&>svg]:text-(--color-palette-gray-500)">
      {icon}
      <span className="sr-only">{label}</span>
      {count}
    </span>
  );
}

export default function CommunityBoardItem({
  item: {
    category,
    commentCount,
    content,
    createdAt,
    imageUrl,
    isPublic,
    likeCount,
    location,
    title,
  },
  metadataItems,
  variant,
}: CommunityBoardItemProps): ReactNode {
  const boardMetadataItems = metadataItems ?? [
    category,
    location,
    getElapsedTimeText(createdAt),
  ];
  const boardTitle = isPublic === false ? PRIVATE_COMMUNITY_BOARD_TITLE : title;

  return (
    <div
      className={`community-board-item community-board-item--${variant} ${
        isPublic === false ? 'is-private' : ''
      } flex min-w-0 flex-1 justify-between gap-[0.8rem]`}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-[0.8rem]">
        <div className="community-board-item-text flex min-w-0 flex-col">
          <h3 className="community-board-item-title truncate font-bold text-(--color-palette-gray-1000)">
            {isPublic === false && <LockFillIcon />}
            <span>{boardTitle}</span>
          </h3>
          {content && (
            <p className="community-board-item-content line-clamp-2 font-normal text-(--color-palette-gray-700)">
              {content}
            </p>
          )}
          <div className="community-board-item-metadata flex flex-wrap items-center gap-[0.4rem] font-normal text-(--color-palette-gray-700)">
            {boardMetadataItems.map((metadataItem, index) => (
              <span key={`${metadataItem}-${index}`}>
                {index > 0 && <span aria-hidden="true">· </span>}
                {metadataItem}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-[0.8rem]">
          <CommunityBoardItemCount
            count={likeCount}
            icon={<ThumbUpFillIcon />}
            label="좋아요"
          />
          <CommunityBoardItemCount
            count={commentCount}
            icon={<CommentTextFillIcon />}
            label="댓글"
          />
        </div>
      </div>

      {imageUrl && (
        <div className="size-[9.6rem] shrink-0 overflow-hidden rounded-[0.6rem] bg-(--color-palette-gray-200) sm:size-[10.8rem]">
          <img
            alt=""
            className="aspect-square h-full w-full shrink-0 object-cover"
            loading="lazy"
            src={imageUrl}
          />
        </div>
      )}
    </div>
  );
}
