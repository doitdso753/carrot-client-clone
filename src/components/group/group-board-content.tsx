import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router';
import GroupDetailSidebar from '@/components/group/group-detail-sidebar.tsx';
import CommunityBoardItem from '@/components/ui/board-list/community-board-item.tsx';
import DetailBreadcrumb from '@/components/ui/navigation/detail-breadcrumb.tsx';
import { getElapsedTimeText } from '@/lib/date-utils.ts';
import type { GroupItem } from '@/types/group';

type GroupBoardContentProps = {
  categoryCode: string;
  item: GroupItem;
};

const GROUP_BOARD_CATEGORY_POST_PAGE_SIZE = 10;

export default function GroupBoardContent({
  categoryCode,
  item,
}: GroupBoardContentProps): ReactNode {
  const [visiblePostCount, setVisiblePostCount] = useState(
    GROUP_BOARD_CATEGORY_POST_PAGE_SIZE,
  );
  const selectedBoardMenuItem = item.boardMenuItems.find(
    (boardMenuItem) => boardMenuItem.categoryCode === categoryCode,
  );

  // 선택 카테고리
  const selectedCategoryCode =
    selectedBoardMenuItem?.categoryCode ??
    item.boardMenuItems[0]?.categoryCode ??
    'all';

  // 게시글 필터링
  const filteredPosts =
    selectedCategoryCode === 'all'
      ? item.posts
      : item.posts.filter(
          (post) => post.category.categoryCode === selectedCategoryCode,
        );

  // 노출 게시글
  const visiblePosts = filteredPosts.slice(0, visiblePostCount);
  const hasMorePosts = visiblePostCount < filteredPosts.length;

  // 노출 개수 초기화
  useEffect(() => {
    setVisiblePostCount(GROUP_BOARD_CATEGORY_POST_PAGE_SIZE);
  }, [selectedCategoryCode]);

  // 게시글 추가 노출
  const handlePostMoreButtonClick = (): void => {
    setVisiblePostCount((currentVisiblePostCount) =>
      Math.min(
        currentVisiblePostCount + GROUP_BOARD_CATEGORY_POST_PAGE_SIZE,
        filteredPosts.length,
      ),
    );
  };

  return (
    <main className="detail-page-wrapper">
      <DetailBreadcrumb
        isMobileVisible
        items={[
          { label: '홈', to: '/' },
          { label: '모임', to: '/group' },
          { label: item.title, to: `/group/${item.id}` },
          { label: selectedBoardMenuItem?.categoryName ?? '게시판' },
        ]}
      />

      <div className="group-board-content-layout">
        <GroupDetailSidebar
          item={item}
          selectedBoardCategoryCode={selectedCategoryCode}
          selectedCommonMenuCode={null}
        />
        <section
          className="group-board-content-main"
          aria-label="모임 게시글 콘텐츠"
        >
          <div
            className="group-board-content-tabs"
            role="tablist"
            aria-label="게시판 카테고리"
          >
            {item.boardMenuItems.map((boardMenuItem) => (
              <Link
                className={
                  boardMenuItem.categoryCode === selectedCategoryCode
                    ? 'is-selected'
                    : undefined
                }
                key={boardMenuItem.id}
                to={`/group/${item.id}/board/${boardMenuItem.categoryCode}`}
                role="tab"
                aria-selected={
                  boardMenuItem.categoryCode === selectedCategoryCode
                }
              >
                {boardMenuItem.categoryName}
              </Link>
            ))}
          </div>

          <h1 className="group-board-content-heading">
            {selectedBoardMenuItem?.categoryName ?? '게시판'}
          </h1>

          {visiblePosts.length > 0 ? (
            <>
              <ul className="group-board-content-post-list">
                {visiblePosts.map((post) => (
                  <li key={post.id}>
                    <Link
                      to={`/group/${item.id}/board/${post.category.categoryCode}/${post.id}`}
                    >
                      <CommunityBoardItem
                        item={post}
                        metadataItems={[
                          post.authorProfile.nickname,
                          getElapsedTimeText(post.createdAt),
                          post.category.categoryName,
                        ]}
                        variant="group"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              {hasMorePosts && (
                <button
                  className="group-detail-post-more-button"
                  type="button"
                  onClick={handlePostMoreButtonClick}
                >
                  더보기
                </button>
              )}
            </>
          ) : (
            <div className="list-empty-state">
              <strong>아직 게시글이 없어요</strong>
              <p>가장 먼저 게시글을 남겨보세요.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
