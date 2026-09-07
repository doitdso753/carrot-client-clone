import { useState, type ReactNode } from 'react';
import {
  BookmarkIcon,
  CalendarFillIcon,
  CommentTextIcon,
  HotIcon,
  ThumbUpIcon,
} from '@/assets/icons';
import ImagePreview from '@/components/ui/image/image-preview.tsx';
import UserProfileSummary from '@/components/ui/user-profile/user-profile-summary.tsx';
import { getElapsedTimeText } from '@/lib/date-utils.ts';
import type {
  GroupPost,
  GroupPostContentItem,
  GroupSchedule,
} from '@/types/group';

type GroupBoardPostSectionProps = {
  post: GroupPost;
};

type GroupBoardPostContentCardProps = {
  icon: ReactNode;
  metadata: string;
  title: string;
};

// 일정 메타정보 포맷
function formatScheduleMetadata(schedule: GroupSchedule): string {
  const scheduleDate = new Date(schedule.date);
  const month = scheduleDate.getMonth() + 1;
  const date = String(scheduleDate.getDate()).padStart(2, '0');
  const weekday = new Intl.DateTimeFormat('ko-KR', {
    weekday: 'short',
  }).format(scheduleDate);

  return `${month}월 ${date}일 (${weekday}), ${schedule.time} · ${schedule.currentMemberCount}/${schedule.maximumMemberCount}명 참여`;
}

// 게시글 콘텐츠 카드
function GroupBoardPostContentCard({
  icon,
  metadata,
  title,
}: GroupBoardPostContentCardProps): ReactNode {
  return (
    <button className="group-board-post-content-card-wrapper" type="button">
      <div className="group-board-post-content-card">
        <span className="group-board-post-content-card-icon">{icon}</span>
        <span className="group-board-post-content-card-information">
          <strong>{title}</strong>
          <span>{metadata}</span>
        </span>
      </div>
    </button>
  );
}

// 게시글 사진
function GroupBoardPostPicture({
  imageUrl,
}: {
  imageUrl: string;
}): ReactNode {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const closeImagePreview = (): void => {
    setIsPreviewOpen(false);
  };

  return (
    <>
      <div className="group-board-post-image-wrapper">
        <button
          aria-label="게시글 이미지 미리보기"
          type="button"
          onClick={() => setIsPreviewOpen(true)}
        >
          <img alt="" loading="lazy" src={imageUrl} />
        </button>
      </div>

      {isPreviewOpen && (
        <ImagePreview
          imageUrls={[imageUrl]}
          initialImageIndex={0}
          title="게시글 이미지"
          onClose={closeImagePreview}
          onImageChange={() => undefined}
        />
      )}
    </>
  );
}

// 게시글 콘텐츠 항목
function GroupBoardPostContentItem({
  contentItem,
}: {
  contentItem: GroupPostContentItem;
}): ReactNode {
  if (contentItem.type === 'text') {
    return <p>{contentItem.text}</p>;
  }

  if (contentItem.type === 'picture') {
    return <GroupBoardPostPicture imageUrl={contentItem.imageUrl} />;
  }

  if (contentItem.type === 'schedule') {
    return (
      <GroupBoardPostContentCard
        icon={<CalendarFillIcon />}
        metadata={formatScheduleMetadata(contentItem.schedule)}
        title={contentItem.schedule.title}
      />
    );
  }

  return (
    <GroupBoardPostContentCard
      icon={<HotIcon />}
      metadata={contentItem.challenge.metadata}
      title={contentItem.challenge.title}
    />
  );
}

export default function GroupBoardPostSection({
  post,
}: GroupBoardPostSectionProps): ReactNode {
  const contentItems =
    post.contentItems ??
    (post.content
      ? [
          {
            text: post.content,
            type: 'text' as const,
          },
        ]
      : []);

  return (
    <section className="community-post">
      <UserProfileSummary
        metadata={[
          post.authorProfile.location,
          getElapsedTimeText(post.createdAt),
        ]}
        user={post.authorProfile}
        hasWarmthBadge={false}
      />

      <div className="community-post-content">
        {contentItems.map((contentItem, index) => (
          <GroupBoardPostContentItem
            contentItem={contentItem}
            key={`${contentItem.type}-${index}`}
          />
        ))}
      </div>

      <div className="community-post-status pt-8">
        <div className="community-post-reactions">
          <button type="button" aria-label={`좋아요 ${post.likeCount}개`}>
            <ThumbUpIcon />
            <span>{post.likeCount}</span>
          </button>
          <button type="button" aria-label={`댓글 ${post.commentCount}개`}>
            <CommentTextIcon />
            <span>{post.commentCount}</span>
          </button>
          <button type="button" aria-label="북마크">
            <BookmarkIcon />
          </button>
        </div>
        <span>조회 {post.viewCount}</span>
      </div>
    </section>
  );
}
