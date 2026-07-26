import { useState, type ReactNode } from 'react';
import { StarIcon, ThumbUpIcon } from '@/assets/icons';
import ImagePreview from '@/components/ui/image-preview.tsx';
import type { LocalProfileReview } from '@/types/types.ts';

type LocalProfileReviewItemProps = {
  hasReply?: boolean;
  review: LocalProfileReview;
};

export default function LocalProfileReviewItem({
  hasReply = true,
  review,
}: LocalProfileReviewItemProps): ReactNode {
  const [isProfilePreviewOpen, setIsProfilePreviewOpen] = useState(false);

  const openProfileImagePreview = (): void => {
    setIsProfilePreviewOpen(true);
  };

  const closeProfileImagePreview = (): void => {
    setIsProfilePreviewOpen(false);
  };

  return (
    <>
      <article className="local-profile-review-item">
        <header className="local-profile-review-profile">
          <button
            className="local-profile-review-profile-image"
            type="button"
            aria-label={`${review.authorName} 프로필 이미지 미리보기`}
            onClick={openProfileImagePreview}
          >
            <img
              src={review.profileImageUrl}
              alt={`${review.authorName} 프로필`}
            />
          </button>

          <div className="local-profile-review-profile-content">
            <strong>{review.authorName}</strong>
            <p>
              <span className="local-profile-meta-item local-profile-meta-item--divider">
                {review.authorRegionText} 인증{' '}
                {review.certifiedCount.toLocaleString()}회
              </span>
              <span className="local-profile-meta-item">
                {review.createdAtText}
              </span>
            </p>
          </div>
        </header>

        {review.imageUrls && review.imageUrls.length > 0 && (
          <div className="local-profile-review-images">
            {review.imageUrls.map((imageUrl, imageIndex) => (
              <img
                src={imageUrl}
                alt={`${review.authorName} 후기 이미지 ${imageIndex + 1}`}
                key={imageUrl}
              />
            ))}
          </div>
        )}

        <div className="local-profile-review-content">
          <strong className="local-profile-rating local-profile-review-rating">
            <StarIcon />
            {review.rating.toFixed(1)}
          </strong>
          <p>{review.content}</p>
        </div>

        <button className="local-profile-review-helpful" type="button">
          <ThumbUpIcon />
          <span className="local-profile-meta-item">
            도움돼요 {review.helpfulCount.toLocaleString()}
          </span>
        </button>

        {hasReply && review.reply && (
          <div className="local-profile-review-reply">
            <div className="local-profile-review-reply-content">
              <div className="local-profile-review-reply-heading">
                <strong>사장님의 답글</strong>
                <span>{review.reply.createdAtText}</span>
              </div>
              <p>{review.reply.content}</p>
            </div>
          </div>
        )}
      </article>

      {isProfilePreviewOpen && (
        <ImagePreview
          imageUrls={[review.profileImageUrl]}
          initialImageIndex={0}
          title={`${review.authorName} 프로필 이미지`}
          onClose={closeProfileImagePreview}
          onImageChange={() => undefined}
        />
      )}
    </>
  );
}
