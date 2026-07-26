import type { ReactNode } from 'react';
import { ChevronRightThinIcon } from '@/assets/icons';
import LocalProfileReviewPopup from '@/components/local-profile/popups/local-profile-review-popup.tsx';
import usePopup from '@/hooks/use-popup.ts';
import LocalProfileDetailSection from './local-profile-detail-section.tsx';
import LocalProfileReviewItem from './local-profile-review-item.tsx';
import type { LocalProfileReview } from '@/types/types.ts';

type LocalProfileReviewSectionProps = {
  reviewCount?: number;
  reviews?: LocalProfileReview[];
};

const VISIBLE_REVIEW_COUNT = 3;

export default function LocalProfileReviewSection({
  reviewCount,
  reviews = [],
}: LocalProfileReviewSectionProps): ReactNode {
  const { closePopup, isOpen, openPopup } = usePopup();
  const visibleReviews = reviews.slice(0, VISIBLE_REVIEW_COUNT);
  const totalReviewCount = reviewCount ?? reviews.length;
  const hasMoreReviews = totalReviewCount > VISIBLE_REVIEW_COUNT;

  return (
    <>
      <LocalProfileDetailSection
        action={
          hasMoreReviews && (
            <button
              className="local-profile-more"
              type="button"
              onClick={openPopup}
            >
              더보기
              <ChevronRightThinIcon />
            </button>
          )
        }
        id="reviews"
        title={`후기 ${totalReviewCount.toLocaleString()}개`}
      >
        <div className="local-profile-review-list">
          {visibleReviews.map((review) => (
            <LocalProfileReviewItem key={review.id} review={review} />
          ))}
        </div>
      </LocalProfileDetailSection>

      <LocalProfileReviewPopup
        isOpen={isOpen}
        reviews={reviews}
        onClose={closePopup}
      />
    </>
  );
}
