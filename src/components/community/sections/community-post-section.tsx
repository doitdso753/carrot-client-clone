import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { BookmarkIcon, CommentTextIcon, ThumbUpIcon } from '@/assets/icons';
import LocationMapCard from '@/components/ui/map/location-map-card.tsx';
import UserProfileSummary from '@/components/ui/user-profile/user-profile-summary.tsx';
import { getElapsedTimeText, parseTags } from '@/lib/utils.ts';
import type { CommunityDetailData } from '@/types/community';

type CommunityPostSectionProps = {
  categoryCode?: string;
  item: CommunityDetailData;
};

export default function CommunityPostSection({
  categoryCode,
  item,
}: CommunityPostSectionProps): ReactNode {
  const tags = parseTags(item.tags);

  return (
    <section className="community-post">
      <Link
        className="community-post-category-badge"
        to={categoryCode ? `/community?category=${categoryCode}` : '/community'}
      >
        {item.category}
      </Link>
      <UserProfileSummary
        createdAt={getElapsedTimeText(item.createdAt)}
        user={item.authorProfile}
      />

      <div className="community-post-content">
        <h1>{item.title}</h1>
        {item.content && <p>{item.content}</p>}
      </div>

      <LocationMapCard placeName={item.location} roadAddress={item.location} />

      <div className="community-post-tags">
        {tags.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>

      <div className="community-post-status">
        <div className="community-post-reactions">
          <button type="button" aria-label={`좋아요 ${item.likeCount}개`}>
            <ThumbUpIcon />
            <span>{item.likeCount}</span>
          </button>
          <button type="button" aria-label={`댓글 ${item.commentCount}개`}>
            <CommentTextIcon />
            <span>{item.commentCount}</span>
          </button>
          <button type="button" aria-label="북마크">
            <BookmarkIcon />
          </button>
        </div>
        <span>조회 {item.viewCount}</span>
      </div>
    </section>
  );
}
