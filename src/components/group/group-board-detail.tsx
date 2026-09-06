import type { ReactNode } from 'react';
import { useParams } from 'react-router';
import GroupDetailSidebar from '@/components/group/group-detail-sidebar.tsx';
import DetailBreadcrumb from '@/components/ui/navigation/detail-breadcrumb.tsx';
import { type GroupItem } from '@/types/group';

type GroupBoardDetailProps = {
  item: GroupItem;
};

export default function GroupBoardDetail({
  item,
}: GroupBoardDetailProps): ReactNode {
  const { postId } = useParams();

  // 게시글 조회
  const post = item.posts.find(
    ({ id: groupPostId }) => groupPostId === Number(postId),
  );

  if (!post) {
    return null;
  }

  return (
    <main className="detail-page-wrapper">
      <DetailBreadcrumb
        isMobileVisible
        items={[
          { label: '홈', to: '/' },
          { label: '모임', to: '/group' },
          { label: item.title, to: `/group/${item.id}` },
          {
            label: post.category.categoryName,
            to: `/group/${item.id}/board/${post.category.categoryCode}`,
          },
          { label: post.title },
        ]}
      />

      <div className="group-board-detail-layout">
        <GroupDetailSidebar
          item={item}
          selectedBoardCategoryCode={post.category.categoryCode}
          selectedCommonMenuCode={null}
        />

        <div className="group-board-detail-main">
        </div>
      </div>
    </main>
  );
}
