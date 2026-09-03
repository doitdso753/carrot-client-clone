import type { ReactNode } from 'react';
import CommunityBoardItem from '@/components/ui/board-list/community-board-item.tsx';
import { formatNumericDate } from '@/lib/date-utils.ts';
import { formatThousandsBySuffix } from '@/lib/utils.ts';
import type { GroupItem } from '@/types/group';
import GroupDetailSection from '../group-detail-section.tsx';

type GroupDetailPostSectionProps = {
  item: GroupItem;
};

export default function GroupDetailPostSection({
  item,
}: GroupDetailPostSectionProps): ReactNode {
  return (
    <GroupDetailSection
      title={`게시글 ${formatThousandsBySuffix(item.postCount, '')}`}
    >
      <div
        className="group-detail-board-tabs"
        role="tablist"
        aria-label="게시판 카테고리"
      >
        {item.boardMenuItems.map((boardMenuItem, index) => (
          <button
            className={index === 0 ? 'is-selected' : undefined}
            key={boardMenuItem}
            type="button"
            role="tab"
            aria-selected={index === 0}
          >
            {boardMenuItem}
          </button>
        ))}
      </div>
      <ul className="group-detail-post-list">
        {item.posts.map((post) => (
          <li key={post.id}>
            <CommunityBoardItem
              item={post}
              metadataItems={[
                post.authorProfile.nickname,
                formatNumericDate(post.createdAt),
                post.category,
              ]}
              variant="group"
            />
          </li>
        ))}
      </ul>
      <button className="group-detail-post-more-button" type="button">
        게시글 더보기
      </button>
    </GroupDetailSection>
  );
}
