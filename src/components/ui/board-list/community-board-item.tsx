import type { ReactNode } from 'react';
import { CommentTextFillIcon, ThumbUpFillIcon } from '@/assets/icons';

const COMMUNITY_BOARD_ITEM_VARIANTS = {
  list: {
    descriptionClassName: 'text-[1.6rem]',
    titleClassName: 'text-[2rem]',
  },
  popular: {
    descriptionClassName: 'text-[1.4rem]',
    titleClassName: 'text-[1.6rem]',
  },
} as const;

type CommunityBoardItemVariant = keyof typeof COMMUNITY_BOARD_ITEM_VARIANTS;

type CommunityBoardItemData = {
  commentCount: number;
  description?: string;
  imageUrl?: string;
  likeCount: number;
  metadata: ReactNode;
  title: string;
};

type CommunityBoardItemProps = {
  item: CommunityBoardItemData;
  variant: CommunityBoardItemVariant;
};

type CommunityBoardItemCountProps = {
  count: number;
  icon: ReactNode;
  label: string;
};

function CommunityBoardItemCount({
  count,
  icon,
  label,
}: CommunityBoardItemCountProps): ReactNode {
  return (
    <span className="flex items-center gap-1 text-[1.4rem] font-normal text-(--color-palette-gray-700) [&>svg]:size-[1.8rem] [&>svg]:text-(--color-palette-gray-500)">
      {icon}
      <span className="sr-only">{label}</span>
      {count}
    </span>
  );
}

export default function CommunityBoardItem({
  item: { commentCount, description, imageUrl, likeCount, metadata, title },
  variant,
}: CommunityBoardItemProps): ReactNode {
  const { descriptionClassName, titleClassName } =
    COMMUNITY_BOARD_ITEM_VARIANTS[variant];

  return (
    <div className="flex min-w-0 flex-1 justify-between gap-[0.8rem]">
      <div className="flex min-w-0 flex-1 flex-col gap-[0.8rem]">
        <div className="flex min-w-0 flex-col gap-[0.4rem]">
          <h3
            className={`truncate font-bold text-(--color-palette-gray-1000) ${titleClassName}`}
          >
            {title}
          </h3>
          {description && (
            <p
              className={`line-clamp-2 font-normal text-(--color-palette-gray-700) ${descriptionClassName}`}
            >
              {description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-[0.4rem] text-[1.4rem] font-normal text-(--color-palette-gray-700)">
            {metadata}
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
