import { useMemo, useState, type ReactNode } from 'react';
import CommunityBoardItem from '@/components/ui/board-list/community-board-item.tsx';
import { getElapsedTimeText } from '@/lib/date-utils.ts';
import { formatThousandsBySuffix } from '@/lib/utils.ts';
import type { GroupItem } from '@/types/group';
import GroupDetailSection from '../group-detail-section.tsx';

type GroupDetailPostSectionProps = {
  item: GroupItem;
};

export default function GroupDetailPostSection({
  item,
}: GroupDetailPostSectionProps): ReactNode {
  const [selectedBoardMenuItem, setSelectedBoardMenuItem] = useState(
    item.boardMenuItems[0]?.categoryCode ?? 'all',
  );
  const filteredPosts = useMemo(() => {
    if (selectedBoardMenuItem === 'all') {
      return item.posts;
    }

    return item.posts.filter(
      (post) => post.category.categoryCode === selectedBoardMenuItem,
    );
  }, [item.posts, selectedBoardMenuItem]);
  const hasFilteredPosts = filteredPosts.length > 0;

  return (
    <GroupDetailSection
      title={`게시글 ${formatThousandsBySuffix(item.postCount, '')}`}
    >
      <div
        className="group-detail-board-tabs"
        role="tablist"
        aria-label="게시판 카테고리"
      >
        {item.boardMenuItems.map((boardMenuItem) => (
          <button
            className={
              boardMenuItem.categoryCode === selectedBoardMenuItem
                ? 'is-selected'
                : undefined
            }
            key={boardMenuItem.id}
            type="button"
            role="tab"
            aria-selected={boardMenuItem.categoryCode === selectedBoardMenuItem}
            onClick={() => setSelectedBoardMenuItem(boardMenuItem.categoryCode)}
          >
            {boardMenuItem.categoryName}
          </button>
        ))}
      </div>
      {hasFilteredPosts ? (
        <>
          <ul className="group-detail-post-list">
            {filteredPosts.map((post) => (
              <li key={post.id}>
                <CommunityBoardItem
                  item={post}
                  metadataItems={[
                    post.authorProfile.nickname,
                    getElapsedTimeText(post.createdAt),
                    post.category.categoryName,
                  ]}
                  variant="group"
                />
              </li>
            ))}
          </ul>
          <button className="group-detail-post-more-button" type="button">
            게시글 더보기
          </button>
        </>
      ) : (
        <div className="list-empty-state">
          <strong>아직 게시글이 없어요</strong>
          <p>가장 먼저 게시글을 남겨보세요.</p>
        </div>
      )}
    </GroupDetailSection>
  );
}
